import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SendCalcDto } from './dto/send-calc.dto';
import { Calc, CurrentItem, Operator } from './entities/calc.entity';
import { MathService } from './math.service';
import * as data from './operators.json';

/**
 * The role of CalcService is to parse the calculus into usable data. And with MathService methods, resolve the calculus. <br>
 * The logic and the actual math is separated to implements more easely new operators by making the parser agnostic of them. 
 */
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
  
  /**
   * The main method, who does the calculus. First parse the calculus, and resolving it. <br>
   * @param {SendCalcDto} sendCalcDto DTO formated data sent from the front-end.
   * @returns {object} The result of the calculus -> {calculus: string, result: string} -> "calculus": the calculus to resolve. "result": the result of the calculus.
   */
  calculate(sendCalcDto: SendCalcDto) {
    const calc = this.parse(sendCalcDto.calculus);
    calc.result = this.doCalculate(calc);
    
    return {
      calculus: calc.calculus,
      result: this.doCalculate(calc)
    };
  }

  /**
   * This method parse a calculus string. The process is simple: <br>
   *  1. Checks if the calculus is valid, if not, throws a user-friendly error. <br>
   *  2. Separate items (actual numbers) and operators.
   * @param calculus String representing the calculus.
   * @returns {Calc} Returns a Calc with Calc.items property filled with the parsed calculus.
   */
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

      /* TODO -> Make a cleaner version who handles dot folowed by operator */

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
        curr = new CurrentItem(curr.value += chars[i], false, true);
        continue;
      }

      if (!this.isFirst(i)) {
        if (this.isNegative(chars[i]) && this.isOperator(chars[i-1])) {
          curr = new CurrentItem(curr.value += chars[i], false, true);
          continue;
        }
      }

      // Adds every number or dot
      if (this.isNumber(chars[i]) && (this.isNumber(chars[i+1]) || this.isDot(chars[i+1]))) {
        curr = new CurrentItem(curr.value += chars[i], curr.hasDot, curr.hasNegative);
        continue;
      }

      if (this.isDot(chars[i])) {
        curr = new CurrentItem(curr.value += chars[i], true, curr.hasNegative);
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

  /**
   * Check if the char is a number is superior or equal to 0 and is inferior or equal to 9.
   * @param char A single char to be checked.
   * @returns {boolean} The boolean value of the check.
   */
  private isNumber(char: string): boolean {
    return (+char >= 0 && +char <= 9);
  }

  /**
   * Check if the char is an operator. Operator are stored in a Map<string, Operator>.
   * @param char A single char to be checked.
   * @returns {boolean} The boolean value of the check.
   */
  private isOperator(char: string): boolean {
    return this.myOperators.has(char);
  }

  /**
   * Check if the char is the first of the calculus, by sending the current index of the for loop.
   * @param i Index of the ForLoop.
   * @returns {boolean} The boolean value of the check.
   */
  private isFirst(i: number): boolean {
    return i === 0;
  }

  /**
   * Check if the char is the last of the calculus, by sending the current index of the for loop, and the chars array.
   * @param index Index of the ForLoop.
   * @param chars Chars array, representing the splited string of the calculus.
   * @returns {boolean} The boolean value of the check.
   */
  private isLast(index: number, chars: string[]): boolean {
    return index == (chars.length-1);
  }

  /**
   * Check if the char is a dot.
   * @param char A single char to be checked.
   * @returns {boolean} The boolean value of the check.
   */
  private isDot(char: string): boolean {
    return char === '.';
  }

  /**
   * Check if the char is a negative Operator
   * @param char A single char to be checked.
   * @returns {boolean} The boolean value of the check.
   */
  private isNegative(char: string): boolean {
    return char === '-';
  }

  /**
   * Send an error message to the front-end, with 422 code, who's catched by the front-end and properly handled. And make a clean log.
   * @param message User friendly message of the error.
   * @throws {HttpException} A user friendly error
   */
  private throwErrorParse(message) {
    const completeMsg = `An error occured during the execution of the calculus: ${message}`;
    this.myLogger.error(completeMsg);
    throw new HttpException(completeMsg, HttpStatus.UNPROCESSABLE_ENTITY)
  }

  /**
   * Will do the calculus. By iterating over the items, executing each operator with the n-1 and n+1 item around the operator in the array. One execution per iteration, There is as many iteration as operators in the items array. <br>
   * Ex: "2+2" one iteration. "1+2-3" two iteration. <br>
   * At each iteration, the operator who will be executed is the operator matching the highest priority number, if multiple number matches the priority number, only the first one in the iteration will be executed. <br>
   * An execution will remove the operator from the array and the n+1 item too. The result of the operation will replace n-1 value in the array. <br>
   * Full example: <br>
   *  -> 1+2*3 -> after parsing -> ["1", {value: "+", name: "addition", priority: "1"}, "2", {value: "+", name: "multiplication", priority: "2"}, "3"] <br>
   *  -> first iteration: ["1", {value: "+", name: "addition", priority: "1"}, "6"] <br>
   *  -> second iteration: ["7"]
   * @param {Calc} calc Instance of Calc, holding the parsed Calculus to be calculated
   * @returns The result of the calculus
   */
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

  /**
   * Will return the highter priority number of the items supplied.
   * Ex: "1+2-3*4/5" -> returns 2.
   * @param items An array of items and operators
   * @returns {number} The higher priority number.
   */
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
