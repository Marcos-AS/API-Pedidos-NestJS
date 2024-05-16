/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner} from "typeorm";

export class inicioAllTables1715799750344 implements MigrationInterface {
    name = 'inicioAllTables1715799750344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comprador" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "telefono" character varying NOT NULL, CONSTRAINT "PK_2174fea3473575f9d08507dbc78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operador" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_6cd1ed38785b46d815458885dfd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" SERIAL NOT NULL, "date" date NOT NULL, "operador" json NOT NULL, "products" json NOT NULL, CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria" ("id" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, CONSTRAINT "UQ_6771d90221138c5bf48044fd73d" UNIQUE ("nombre"), CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fabricante" ("id" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "direccion" character varying NOT NULL, "email" character varying NOT NULL, "imagen" character varying NOT NULL, CONSTRAINT "UQ_86a08872e8e5ca25e9a069145e2" UNIQUE ("nombre"), CONSTRAINT "PK_3e7c3d76edc644d8d7f8d9a4670" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "fabricante"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
        await queryRunner.query(`DROP TABLE "pedido"`);
        await queryRunner.query(`DROP TABLE "operador"`);
        await queryRunner.query(`DROP TABLE "comprador"`);
    }

}
