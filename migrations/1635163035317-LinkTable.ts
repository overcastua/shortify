import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinkTable1635163035317 implements MigrationInterface {
  name = 'LinkTable1635163035317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE link 
        (
          origin_url character varying NOT NULL,
          tokenized_url character varying NOT NULL,
          user_id int REFERENCES auth.user (id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6),
          CONSTRAINT UQ_token UNIQUE (tokenized_url), 
          CONSTRAINT PK_user PRIMARY KEY (origin_url)
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE link`);
  }
}
