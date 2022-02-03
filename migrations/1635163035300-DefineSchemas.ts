import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefineSchemas1635163035300 implements MigrationInterface {
  name = 'DefineSchemas1635163035300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS auth`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS auth`);
  }
}
