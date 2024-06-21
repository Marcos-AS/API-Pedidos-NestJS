import { Inject, Injectable } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configServ: ConfigType<typeof config>,
    @Inject('MONGO') private mongoDb: Db,
  ) {}

  getHello(): string {
    const apiKey = this.configServ.apiKey;
    const dbName = this.configServ.database.name;
    const dbPort = this.configServ.database.port;
    return `La llave de la aplicación es: ${apiKey} y el nombre y puerto de la DB: ${dbName}, ${dbPort}`;
  }

  getTareas() {
    const tasksCollection = this.mongoDb.collection('Tasks');
    return tasksCollection.find().toArray();
  }
}
