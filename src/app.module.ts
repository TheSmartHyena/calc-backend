import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalcModule } from './calc/calc.module';
import { MathService } from './calc/math.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

/**
 * Represents the main module of the app. <br>
 * We can see in the imports the instruction: "ServeStaticModule.forRoot(...", this instruction is to serve the React front-end, (in /build), to serve it at path "/" on the server. <br>
 * Source code of the front-end is in a separate repository: https://github.com/TheSmartHyena/calc-frontend 
 */
@Module({
  imports: [CalcModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'build'),
    renderPath: "/",
  })],
  controllers: [AppController],
  providers: [AppService, MathService],
  
})
export class AppModule {}
