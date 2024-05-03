import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Get()
  getHello(): string {
    //return "hola";
    return this.appService.getHello();
  }

  getEnvs(): string {
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    return `Envs: ${apiKey} ${name}`;
  }
}
