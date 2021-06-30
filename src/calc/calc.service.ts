import { Injectable, Logger } from '@nestjs/common';
import { SendCalcDto } from './dto/send-calc.dto';

@Injectable()
export class CalcService {
  private readonly logger = new Logger(CalcService.name);

  calculate(sendCalcDto: SendCalcDto) {
    this.logger.log("Calculus works.");
    return 'This action do calculus';
  }
}
