import { Injectable } from '@nestjs/common';
import { Decimal } from 'decimal.js'

/**
 * This service execute math functions, all math function params are string to avoid JS doing imprecision with Float values. That's why Decimal.js is used. <br>
 * For more details see this topic: https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
 */
@Injectable()
export class MathService {

    /**
     * @property {Map<string, function>} myMathFunctions Stores a set of functions, key is a string, representing the name of the function. 
     * @private 
     */
    private readonly myMathFunctions: Map<string, any> = new Map();

    /**
     * Initialize myMathFunctions property, a Map with every math function we implemented.
     */
    constructor() {
        this.myMathFunctions.set("addition", this.addition)
        this.myMathFunctions.set("substraction", this.substraction)
        this.myMathFunctions.set("multiplication", this.multiplication)
        this.myMathFunctions.set("division", this.division)
    }

    /**
     * Returns a math function who's gonna be executed.
    * @param {string} name  The name of the math function to return.
    * @returns {function} A function with 2 string parameter, a & b, executing a single math task.
    */
    getMathFunction(name: string): any {
        return this.myMathFunctions.get(name);
    }

    /**
     * Perform an addition
     * @param {string} a
     * @param {string} b
     * @returns {string} the result of a + b
     */
    addition(a:string, b:string): string {
        return new Decimal(a).plus(b).toFixed();
    }

    /**
     * Perform a substraction
     * @param {string} a 
     * @param {string} b 
     * @returns {string} The result of a - b
     */
    substraction(a:string, b:string): string {
        return new Decimal(a).minus(b).toFixed();
    }

    /**
     * Perform a multiplication
     * @param {string} a 
     * @param {string} b 
     * @returns {string} The result of a * b
     */
    multiplication(a:string, b:string): string {
        return new Decimal(a).times(b).toFixed();
    }

    /**
     * Perform a division
     * @param {string} a 
     * @param {string} b 
     * @returns {string} The result of a / b
     */
    division(a:string, b:string): string {
        return new Decimal(a).dividedBy(b).toFixed();
    }
}