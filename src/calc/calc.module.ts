import { Module } from '@nestjs/common';
import { CalcService } from './calc.service';
import { MathService } from './math.service';
import { CalcController } from './calc.controller';

/**
 * Represents the CalcModule
 */
@Module({
  controllers: [CalcController],
  providers: [CalcService, MathService],
})
export class CalcModule {}
