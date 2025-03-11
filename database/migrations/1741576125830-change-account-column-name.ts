import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAccountColumnName1741576125830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      // Rename columns in accounts table
      await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "bank_name" TO "bankName"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "account_number" TO "accountNumber"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "is_active" TO "isActive"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "user_id" TO "userId"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "created_at" TO "createdAt"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "updated_at" TO "updatedAt"
    `);

    // Update foreign key constraint
    await queryRunner.query(`
        ALTER TABLE "accounts" 
        DROP CONSTRAINT "FK_accounts_user"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts"
        ADD CONSTRAINT "FK_accounts_user" 
        FOREIGN KEY ("userId") 
        REFERENCES "users"("id") ON DELETE CASCADE
    `);

    // Update account_id in transactions table
    await queryRunner.query(`
        ALTER TABLE "transactions" 
        RENAME COLUMN "account_id" TO "accountId"
    `);

    // Update foreign key constraint in transactions table
    await queryRunner.query(`
        ALTER TABLE "transactions" 
        DROP CONSTRAINT "FK_transactions_account"
    `);

    await queryRunner.query(`
        ALTER TABLE "transactions"
        ADD CONSTRAINT "FK_transactions_account"
        FOREIGN KEY ("accountId") 
        REFERENCES "accounts"("id") ON DELETE RESTRICT
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      // Revert foreign key constraint in transactions table
      await queryRunner.query(`
        ALTER TABLE "transactions" 
        DROP CONSTRAINT "FK_transactions_account"
    `);

    await queryRunner.query(`
        ALTER TABLE "transactions"
        ADD CONSTRAINT "FK_transactions_account"
        FOREIGN KEY ("account_id") 
        REFERENCES "accounts"("id") ON DELETE RESTRICT
    `);

    // Revert account_id in transactions table
    await queryRunner.query(`
        ALTER TABLE "transactions" 
        RENAME COLUMN "accountId" TO "account_id"
    `);

    // Revert foreign key constraint in accounts table
    await queryRunner.query(`
        ALTER TABLE "accounts" 
        DROP CONSTRAINT "FK_accounts_user"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts"
        ADD CONSTRAINT "FK_accounts_user" 
        FOREIGN KEY ("user_id") 
        REFERENCES "users"("id") ON DELETE CASCADE
    `);

    // Revert columns in accounts table
    await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "updatedAt" TO "updated_at"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "createdAt" TO "created_at"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "userId" TO "user_id"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "isActive" TO "is_active"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "accountNumber" TO "account_number"
    `);

    await queryRunner.query(`
        ALTER TABLE "accounts" 
        RENAME COLUMN "bankName" TO "bank_name"
    `);
    }

}
