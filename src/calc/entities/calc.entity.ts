export class Calc {

    constructor(calculus: string, items: (string | Operator)[]) {
        this.calculus = calculus;
        this.items = items;
    }

    calculus: string
    items: (string | Operator)[]
    result: string
}

export class Operator { 
    constructor(value: string, priority: number, name: string) {
        this.value = value;
        this.priority = priority;
        this.name = name;
    }

    value: string
    priority: number
    name: string
}

export class CurrentItem {
    constructor(value: string="", hasDot: boolean=false, hasNegative: boolean=false) {
        this.value = value;
        this.hasDot = hasDot;
        this.hasNegative = hasNegative;
    }

    value: string
    hasDot: boolean
    hasNegative: boolean
}