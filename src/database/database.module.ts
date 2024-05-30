import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoClient } from 'mongodb';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, host, name, password, port } = configService.postgres;
        // const { user, host, name, password, port } = configService.mysql;
        return {
          type: 'postgres',
          // type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: name,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: name,
          password,
          port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, host, name, password, port, connection } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(name);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG', 'MONGO', TypeOrmModule],
})
export class DatabaseModule {}
