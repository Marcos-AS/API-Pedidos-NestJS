import { Inject, Injectable } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';
//import { Client } from 'pg';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configServ: ConfigType<typeof config>,
    @Inject('TAREA_ASINC') private tarea: any[],
    //@Inject('PG') private clientPg: Client,
    @Inject('MONGO') private mongoDb: Db,
  ) {}

  getHello(): string {
    const apiKey = this.configServ.apiKey;
    const dbName = this.configServ.database.name;
    const dbPort = this.configServ.database.port;
    return `La llave de la aplicación es: ${apiKey} y el nombre y puerto de la DB: ${dbName}, ${dbPort}`;
  }

  getUseFactory(): string {
    console.log(this.tarea);
    return 'realizando una tarea asíncrona de ejemplo';
  }

  getTareas() {
    // return new Promise((resolve, reject) => {
    //   this.clientPg.query('SELECT * FROM tareas', (err, res) => {
    //     if (err) {
    //       reject(err);
    //     }
    //     resolve(res.rows);
    //   });
    // });
    const tasksCollection = this.mongoDb.collection('Tasks');
    return tasksCollection.find().toArray();
  }
}
