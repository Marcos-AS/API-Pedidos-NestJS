import {MigrationInterface, QueryRunner} from "typeorm";

export class compradorOpProductoFab1716323895783 implements MigrationInterface {
    name = 'compradorOpProductoFab1716323895783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comprador" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "operador" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "operador" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "operador" ADD "compradorId" integer`);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "UQ_9a6bd793b4f149fb11d8692ed75" UNIQUE ("compradorId")`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "fabricanteId" integer`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "fabricanteId"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "UQ_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP COLUMN "compradorId"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "createAt"`);
    }

}
