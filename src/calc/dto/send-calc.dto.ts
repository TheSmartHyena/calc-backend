import { IsString } from "class-validator"

export class SendCalcDto {
    @IsString()
    readonly calculus: string;
}
