import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { isValidationOptions } from 'class-validator';
import { SendCalcDto } from './dto/send-calc.dto';
import { Calc, CurrentItem, Operator } from './entities/calc.entity';
import { MathService } from './math.service';
import * as data from './operators.json';

@Injectable()
export class CalcService {
  private readonly myLogger = new Logger(CalcService.name);
  private readonly myOperators: Map<string, Operator> = new Map();

  constructor(
    private mathService: MathService
  ) {
    data.operators.forEach(obj => {
      this.myOperators.set(obj.value, new Operator(obj.value, Number(obj.priority), obj.name))
    })
  }
  
  calculate(sendCalcDto: SendCalcDto) {
    const calc = this.parse(sendCalcDto.calculus);
    calc.result = this.doCalculate(calc);
    
    return {
      calculus: calc.calculus,
      result: this.doCalculate(calc)
    };
  }

  parse(calculus: string): Calc {
    const items: (string |Operator)[] = []
    let curr = new CurrentItem();

    const chars = calculus.split("");
    for (let i=0; i<chars.length; i++) {

      // Handle wrong items composition
      if (chars[i] === ' ') {
        this.throwErrorParse(`can't contain any white-space: ${calculus}`);
      }

      if (!this.isOperator(chars[i]) && !this.isDot(chars[i]) && !this.isNumber(chars[i])) {
        this.throwErrorParse(`un-recognised charater: ${calculus}`);
      }

      if (this.isFirst(i) && (this.isDot(chars[i]) || (this.isOperator(chars[i]) && !this.isNegative(chars[i]) ) )) {
        this.throwErrorParse(`can't start with dot or operator: ${calculus}`);
      }

      if (this.isLast(i, chars) && (this.isOperator(chars[i]) || this.isDot(chars[i]))) {
        this.throwErrorParse(`can't end with dot or operator: ${calculus}`);
      }

      if (this.isDot(chars[i]) && curr.hasDot) {
        this.throwErrorParse(`an item can't have two dots: ${calculus}`);
      }

      if (this.isNegative(chars[i]) && curr.hasNegative) {
        this.throwErrorParse(`an item can't have two negative sign: ${calculus}`);
      }

      /*if ((!(this.isOperator(chars[i+1]) && this.isNegative(chars[i+1])) || this.isDot(chars[i+1]))) {
        this.throwErrorParse(`two dots, two operators, or dot/operator can't be after one dot/operator: ${calculus}`);
      }*/

      if (!this.isLast(i, chars) && (this.isOperator(chars[i]) || this.isDot(chars[i]))) {
        if (this.isDot(chars[i+1]) || (this.isOperator(chars[i+1]) && !this.isNegative(chars[i+1]))) {
          this.throwErrorParse(`two dots, two operators, or dot/operator can't be after one dot/operator: ${calculus}`);
        }
      } 
      
      // Handle the last char, which is suposed to be a number
      if (this.isLast(i, chars) && this.isNumber(chars[i])) {
        items.push(curr.value + chars[i]);
        continue;
      }

      // Allow negative members
      if (this.isFirst(i) && this.isNegative(chars[i])) {
        curr = new CurrentItem(curr.value += chars[i], false, curr.hasNegative);
        continue;
      }

      if (!this.isFirst(i)) {
        if (this.isNegative(chars[i]) && this.isOperator(chars[i-1])) {
          curr = new CurrentItem(curr.value += chars[i], false, curr.hasNegative);
          continue;
        }
      }

      // Adds every number or dot
      if (this.isNumber(chars[i]) && (this.isNumber(chars[i+1]) || this.isDot(chars[i+1]))) {
        curr = new CurrentItem(curr.value += chars[i], curr.hasDot);
        continue;
      }

      if (this.isDot(chars[i])) {
        curr = new CurrentItem(curr.value += chars[i], true);
        continue;
      }

      if (this.isLast(i, chars)) {
        this.throwErrorParse(`Last character isn't number, operator or dot: ${calculus}`);
        continue; // should never get there
      }

      // Handle a  switch from number/operator happen
      if (this.isNumber(chars[i]) && this.isOperator(chars[i+1])) {
        items.push(curr.value + chars[i]);
        curr = new CurrentItem("", false);
        continue;
      }

      if (this.isOperator(chars[i]) && (this.isNumber(chars[i+1]) || this.isNegative(chars[i+1]))) {
        items.push(this.myOperators.get(chars[i]));
        curr = new CurrentItem("", false);
        continue;
      }
    }

    return new Calc(calculus, items);
  }

  private isNumber(char: string): boolean {
    return (+char >= 0 && +char <= 9);
  }

  private isOperator(char: string): boolean {
    return this.myOperators.has(char);
  }

  private isFirst(i: number): boolean {
    return i === 0;
  }

  private isLast(index: number, chars: string[]): boolean {
    return index == (chars.length-1);
  }

  private isDot(char: string): boolean {
    return char === '.';
  }

  private isNegative(char: string): boolean {
    return char === '-';
  }

  private throwErrorParse(message) {
    const completeMsg = `An error occured during the execution of the calculus: ${message}`;
    this.myLogger.error(completeMsg);
    throw new HttpException(completeMsg, HttpStatus.UNPROCESSABLE_ENTITY)
  }

  doCalculate(calc: Calc): string {
    const items: (string|Operator)[] = Array.from(calc.items)    
    let nbOperators: number = 0;
    items.forEach(item => {
      if (item instanceof Operator) {
        nbOperators++;
      }
    })

    let higherPrio = 0;
    for (let j=0; j<nbOperators; j++) {
      higherPrio = 0;
      higherPrio = this.getHigherPrio(items);
      for (let i=0; i<items.length; i++) {

        if ( typeof items[i] == 'string') {
          continue;
        }

        if ((items[i] as Operator).priority === higherPrio) {
          items[i-1] = this.mathService.getMathFunction((items[i] as Operator).name)(items[i-1], items[i+1]);
          items.splice(i+1, 1)
          items.splice(i, 1)
          break;
        }
      }
    }
    
    return items[0] as string;
  }

  private getHigherPrio(items: (string|Operator)[]): number {
    let result = 0

    items.forEach(item => {
      if (item instanceof Operator) {
        if (item.priority > result) {
          result = item.priority;
        }
      }
    })

    return result;
  }
}
