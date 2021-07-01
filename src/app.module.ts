import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalcModule } from './calc/calc.module';
import { MathService } from './calc/math.service';

@Module({
  imports: [CalcModule],
  controllers: [AppController],
  providers: [AppService, MathService],
})
export class AppModule {}
