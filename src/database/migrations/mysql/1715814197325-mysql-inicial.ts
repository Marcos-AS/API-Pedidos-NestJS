import {MigrationInterface, QueryRunner} from "typeorm";

export class mysqlInicial1715814197325 implements MigrationInterface {
    name = 'mysqlInicial1715814197325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comprador\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, \`telefono\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operador\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pedido\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, \`operador\` json NOT NULL, \`products\` json NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`producto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`descripcion\` text NOT NULL, \`precio\` int NOT NULL, \`stock\` int NOT NULL, \`origen\` varchar(255) NOT NULL, \`imagen\` varchar(255) NOT NULL, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d86d179360134b4b74bda75066\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categoria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6771d90221138c5bf48044fd73\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fabricante\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`direccion\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`imagen\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_86a08872e8e5ca25e9a069145e\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_86a08872e8e5ca25e9a069145e\` ON \`fabricante\``);
        await queryRunner.query(`DROP TABLE \`fabricante\``);
        await queryRunner.query(`DROP INDEX \`IDX_6771d90221138c5bf48044fd73\` ON \`categoria\``);
        await queryRunner.query(`DROP TABLE \`categoria\``);
        await queryRunner.query(`DROP INDEX \`IDX_d86d179360134b4b74bda75066\` ON \`producto\``);
        await queryRunner.query(`DROP TABLE \`producto\``);
        await queryRunner.query(`DROP TABLE \`pedido\``);
        await queryRunner.query(`DROP TABLE \`operador\``);
        await queryRunner.query(`DROP TABLE \`comprador\``);
    }

}
