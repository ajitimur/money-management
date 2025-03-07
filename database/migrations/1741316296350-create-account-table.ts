import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccountTable1741316296350 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TYPE "public"."account_type_enum" AS ENUM(
            'CASH', 'BANK', 'CREDIT_CARD', 'E_WALLET', 'INVESTMENT', 'SAVINGS'
        )
    `);

    await queryRunner.query(`
        CREATE TABLE "accounts" (
            "id" SERIAL PRIMARY KEY,
            "name" character varying NOT NULL,
            "type" "public"."account_type_enum" NOT NULL DEFAULT 'CASH',
            "balance" decimal(10,2) NOT NULL DEFAULT 0,
            "bank_name" character varying,
            "account_number" character varying,
            "description" character varying,
            "color" character varying,
            "icon" character varying,
            "is_active" boolean NOT NULL DEFAULT true,
            "user_id" integer NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "FK_accounts_user" FOREIGN KEY ("user_id") 
                REFERENCES "users"("id") ON DELETE CASCADE
        )
    `);

    // Add account_id to transactions table
    await queryRunner.query(`
        ALTER TABLE "transactions"
        ADD COLUMN "account_id" integer NOT NULL
    `);

    await queryRunner.query(`
        ALTER TABLE "transactions"
        ADD CONSTRAINT "FK_transactions_account"
        FOREIGN KEY ("account_id") 
        REFERENCES "accounts"("id") ON DELETE RESTRICT
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        ALTER TABLE "transactions" DROP CONSTRAINT "FK_transactions_account"
    `);
    
    await queryRunner.query(`
        ALTER TABLE "transactions" DROP COLUMN "account_id"
    `);

    await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TYPE "public"."account_type_enum"`);
    }

}
