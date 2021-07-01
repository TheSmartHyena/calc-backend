import { Injectable } from '@nestjs/common';
import { Decimal } from 'decimal.js'

@Injectable()
export class MathService {

    private readonly myMathFunctions: Map<string, any> = new Map();

    constructor() {
        this.myMathFunctions.set("addition", this.addition)
        this.myMathFunctions.set("substraction", this.substraction)
        this.myMathFunctions.set("multiplication", this.multiplication)
        this.myMathFunctions.set("division", this.division)
    }

    getMathFunction(name: string): any {
        return this.myMathFunctions.get(name);
    }

    addition(a:string, b:string): string {
        return new Decimal(a).plus(b).toFixed();
    }

    substraction(a:string, b:string): string {
        return new Decimal(a).minus(b).toFixed();
    }

    multiplication(a:string, b:string): string {
        return new Decimal(a).times(b).toFixed();
    }

    division(a:string, b:string): string {
        return new Decimal(a).dividedBy(b).toFixed();
    }

}