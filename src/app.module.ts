import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import config from './config';
import * as Joi from 'joi';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
// import { MongoClient } from 'mongodb';
import { AuthModule } from './auth/auth.module';

// const uri = 'mongodb://mongo:123456@localhost:27017/?authMechanism=DEFAULT';
// const client = new MongoClient(uri);
// async function run() {
//   await client.connect();
//   const database = client.db('admin');
//   const taskCollection = database.collection('Tasks');
//   const tasks = await taskCollection.find().toArray();
//   console.log(tasks);
// }
// run();

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config], //lee config.ts
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    OperadoresModule,
    ProductosModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TAREA_ASINC',
      useFactory: async (http: HttpService) => {
        const req = http.get('https://jsonplaceholder.typicode.com/posts');
        const tarea = await lastValueFrom(req);
        return tarea.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
