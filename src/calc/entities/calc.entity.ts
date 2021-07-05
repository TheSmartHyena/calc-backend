/** Represents a Calculus.
 * A calculus is a sequence of items and operators. An item is a number (Positive, negative or float), simply stored in a string. An operator can be: "+"", "-", "*", "/", and is stored in an object of type Operator. <br>
 * One item has to be followed by an operator, start and finish with an item to be valid.
 */
export class Calc {
    constructor(calculus: string, items: (string | Operator)[]) {
        this.calculus = calculus;
        this.items = items;
    }

    /** The calculus. */
    calculus: string

    /** The sequence of items (number) and Operators */
    items: (string | Operator)[]

    /** The result of the calculus */
    result: string
}

/**
 * Represents an operator. <br>
 * Operators values are defined in the file: operators.json -> 
 *  * <pre>
 *  {"operators": [
 *      {"value" : "+", "priority" : "1", "name": "addition"},
 *      {"value" : "-", "priority" : "1", "name": "substraction"},
 *      {"value" : "*", "priority" : "2", "name": "multiplication"},
 *      {"value" : "/", "priority" : "2", "name": "division"}
 *  ]}
 * </code>
 */
export class Operator { 
    constructor(value: string, priority: number, name: string) {
        this.value = value;
        this.priority = priority;
        this.name = name;
    }

    /** Symbol as string ex: "+". */
    value: string

    /** Priority level as int, higher the number is, higher the priority is ex: "+ -> priority: 1", "* -> priority: 2" ==> The "*" will be executed first. */
    priority: number

    /** Name of the function is MathService, which is able to actually to the operation Ex: "addition" -> perform a+b. */
    name: string
}

/**
 * Represents an object, who stores informations about current item who's being parsed by the parser. 
 */
export class CurrentItem {
    /**
     * Set value for new CurrentItem instance.
     * @param {string} value Current item value.
     * @param {boolean} hasDot Flag if  contains dot.
     * @param {boolean} hasNegative Flag if item is negative -> contains "-" at first position.
     */
    constructor(value: string="", hasDot: boolean=false, hasNegative: boolean=false) {
        this.value = value;
        this.hasDot = hasDot;
        this.hasNegative = hasNegative;
    }

    /** Store the current sumber.*/
    value: string

    /** Store a flag who represents if the number is float or not, by having a dot. ex: "36.30".*/
    hasDot: boolean

    /** Store a flag who represents if the number is negative or not, by having a "-". ex: "-36.30". */
    hasNegative: boolean
}