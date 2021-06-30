export class Calc {

    constructor(calculus: string, items: (string | Operator)[]) {
        this.calculus = calculus;
        this.items = items;
    }

    calculus: string
    items: (string | Operator)[]
}

export class Operator { 
    constructor(value: string, priority: number) {
        this.value = value;
        this.priority = priority;
    }

    value: string
    priority: number
}

export class CurrentItem {
    constructor(value: string="", previousIsNumber: boolean=false, previousIsOperator: boolean=false, previousIsDot: boolean=false, hasDot: boolean=false) {
        this.value = value;
        this.hasDot = hasDot;
        this.previousIsNumber = previousIsNumber;
        this.previousIsOperator = previousIsOperator;
        this.previousIsDot = previousIsDot;
    }

    hasDot: boolean
    previousIsNumber: boolean
    previousIsOperator: boolean
    previousIsDot: boolean
    value: string
}