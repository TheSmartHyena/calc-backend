import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalcModule } from './calc/calc.module';
import { MathService } from './calc/math.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [CalcModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'build'),
    renderPath: "/",
  })],
  controllers: [AppController],
  providers: [AppService, MathService],
  
})
export class AppModule {}
