import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileTable1635163035326 implements MigrationInterface {
  name = 'ProfileTable1635163035326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE profile 
        (
          id SERIAL NOT NULL,  
          username character varying NOT NULL,
          picture_url character varying NOT NULL DEFAULT 
            'https://e7.pngegg.com/pngimages/274/947/png-clipart-computer-icons-user-business-believer-business-service-people.png',
          user_id int REFERENCES auth.user (id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6), 
          CONSTRAINT PK_profile PRIMARY KEY (id)
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE profile`);
  }
}
