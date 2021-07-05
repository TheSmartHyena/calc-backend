import { IsString } from "class-validator"

/**
 * Represents the body of the post request. to /Calc.
 */
export class SendCalcDto {
    /** The calculus to resolve. */
    @IsString()
    readonly calculus: string;
}
