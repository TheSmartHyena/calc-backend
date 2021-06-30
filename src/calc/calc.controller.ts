import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CalcService } from './calc.service';
import { SendCalcDto } from './dto/send-calc.dto';

@Controller('calc')
export class CalcController {
  constructor(private readonly calcService: CalcService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  calculate(@Body() sendCalcDto: SendCalcDto) {
    return this.calcService.calculate(sendCalcDto);
  }

}
