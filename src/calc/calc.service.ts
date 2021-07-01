import { Injectable, Logger } from '@nestjs/common';
import { isValidationOptions } from 'class-validator';
import { SendCalcDto } from './dto/send-calc.dto';
import { Calc, CurrentItem, Operator } from './entities/calc.entity';
import * as data from './operators.json';

@Injectable()
export class CalcService {
  private readonly myLogger = new Logger(CalcService.name);
  private readonly myOperators: Map<string, Operator> = new Map();

  constructor() {
    data.operators.forEach(obj => {
      this.myOperators.set(obj.value, new Operator(obj.value, Number(obj.priority)))
    })
  }
  
  calculate(sendCalcDto: SendCalcDto) {
    this.myLogger.log("Calculus works.");
    this.myLogger.log(sendCalcDto.calculus);

    const calc = this.parse(sendCalcDto);
    this.myLogger.log(JSON.stringify(calc.items));
    
    return 'This action do calculus';
  }

  private parse(calcDto: SendCalcDto): Calc {
    // const result = new Calc(calcDto.calculus);
    const items: (string |Operator)[] = []
    let curr = new CurrentItem();

    const chars = calcDto.calculus.split("");
    for (let i=0; i<chars.length; i++) {

      // eliminating erros
      if (this.isFirst(i) && this.isDot(chars[i]) && this.isOperator(chars[i])) {
        this.myLogger.error("Cannot start with dot or operator.")
        break;
      }

      if (this.isLast(i, chars) && (this.isOperator(chars[i]) || this.isDot(chars[i]))) {
        this.myLogger.error("Cannot end with dot or operator.")
        break;
      }

      if (((curr.previousIsOperator || curr.previousIsDot) && (this.isOperator(chars[i]) || this.isDot(chars[i]))) || this.isDot(chars[i]) && curr.hasDot) {
        // error --> two dot, two operator, or dot/operator can't be after one dot/operator, or two dot in a value
        this.myLogger.error("Two dots, two operators, or dot/operator can't be after one dot/operator, or two dots in a value.")
        break;
      }

      // last item -> add value & break
      if (this.isLast(i, chars) && this.isNumber(chars[i])) {
        if (curr.previousIsNumber || curr.previousIsDot) {
          items.push(curr.value + chars[i]);
        } else if (curr.previousIsOperator) {
          items.push(chars[i]);
        }
        continue;
      }

      // adding char to value
      if (this.isNumber(chars[i]) && (curr.previousIsNumber || curr.previousIsDot || this.isFirst(i))) {
        curr = new CurrentItem(curr.value += chars[i], true, false, false, curr.hasDot);
        continue;
      }

      if (this.isDot(chars[i])) {
        curr = new CurrentItem(curr.value += chars[i], false, false, true, true);
        continue;
      }

      // break
      if (this.isNumber(chars[i]) && curr.previousIsOperator) {
        items.push(this.myOperators.get(curr.value))
        curr = new CurrentItem(chars[i], true, false, false, false);
        continue;
      }

      if (this.isOperator(chars[i]) && curr.previousIsNumber) {
        items.push(curr.value);
        curr = new CurrentItem(chars[i], false, true, false, false);
        continue;
      }
    }

    return new Calc(calcDto.calculus, items);
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
    return index === chars.length;
  }

  private isDot(char: string): boolean {
    return char === '.';
  }

  private doCalculate() {

  }


}
