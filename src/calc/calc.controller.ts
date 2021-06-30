import { Controller, Post, Body } from '@nestjs/common';
import { CalcService } from './calc.service';
import { SendCalcDto } from './dto/send-calc.dto';

@Controller('calc')
export class CalcController {
  constructor(private readonly calcService: CalcService) {}

  @Post()
  calculate(@Body() sendCalcDto: SendCalcDto) {
    return this.calcService.calculate(sendCalcDto);
  }

}
