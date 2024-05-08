import { Inject, Injectable } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('APIKEY') private apiKey: string,
    //private config: ConfigService,
    @Inject(config.KEY) private configServ: ConfigType<typeof config>,
    @Inject('TAREA_ASINC') private tarea: any[],
  ) {}
  getHello(): string {
    //const apiKey = this.config.get<string>('API_KEY');
    //const dbName = this.config.get('DATABASE_NAME');
    const apiKey = this.configServ.apiKey;
    const dbName = this.configServ.database.name;
    const dbPort = this.configServ.database.port;
    return `La llave de la aplicación es: ${apiKey} y el nombre y puerto de la DB: ${dbName}, ${dbPort}`;
  }

  getUseFactory(): string {
    console.log(this.tarea);
    return 'realizando una tarea asíncrona de ejemplo';
  }
}
