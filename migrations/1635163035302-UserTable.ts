import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1635163035302 implements MigrationInterface {
  name = 'UserTable1635163035302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE auth.user 
        (
          id SERIAL NOT NULL,
          email character varying NOT NULL, 
          password character varying NOT NULL, 
          CONSTRAINT UQ_user_email UNIQUE (email), 
          CONSTRAINT PK_user PRIMARY KEY (id)
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE auth.user`);
  }
}
