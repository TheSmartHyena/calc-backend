import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CalcService } from './calc.service';
import { SendCalcDto } from './dto/send-calc.dto';

/**
 * Represents the controler of the CalcModule
 */
@Controller('calc')
export class CalcController {
  /**
   * Set the injected service
   * @param {CalcService} calcService The injected service 
   */
  constructor(private readonly calcService: CalcService) {}

  /**
   * The only API route and Method for the application. /calc And POST method.
   * @param sendCalcDto Contains data from the POST request, formated as DTO defined in SendCalcDto class.
   * @returns An object with 2 property {calculus: string, result: string} -> Calculus contains the calculus, result contains the result of the calculus. 
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  calculate(@Body() sendCalcDto: SendCalcDto) {
    return this.calcService.calculate(sendCalcDto);
  }
}
