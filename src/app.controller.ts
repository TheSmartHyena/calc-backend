import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

/** App controler */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
