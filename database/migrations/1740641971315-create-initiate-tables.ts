import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitiateTables1740641971315 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user_roles" (
            "id" SERIAL PRIMARY KEY,
            "name" "public"."user_roles_name_enum" NOT NULL DEFAULT 'user',
            "permissions" text NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        )
    `);

    // Users table
    await queryRunner.query(`
        CREATE TABLE "users" (
            "id" SERIAL PRIMARY KEY,
            "email" character varying NOT NULL,
            "password" character varying NOT NULL,
            "firstName" character varying,
            "lastName" character varying,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "UQ_users_email" UNIQUE ("email")
        )
    `);

    // User Role Mappings table
    await queryRunner.query(`
        CREATE TABLE "user_role_mappings" (
            "userId" integer NOT NULL,
            "roleId" integer NOT NULL,
            CONSTRAINT "PK_user_role_mapping" PRIMARY KEY ("userId", "roleId")
        )
    `);

    // Create transaction type enum
    await queryRunner.query(`
        CREATE TYPE "public"."transaction_type_enum" AS ENUM('INCOME', 'EXPENSE')
    `);

    // Categories table
    await queryRunner.query(`
        CREATE TABLE "categories" (
            "id" SERIAL PRIMARY KEY,
            "name" character varying NOT NULL,
            "type" "public"."transaction_type_enum" NOT NULL DEFAULT 'EXPENSE',
            "color" character varying,
            "icon" character varying,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        )
    `);

    // SubCategories table
    await queryRunner.query(`
        CREATE TABLE "sub_categories" (
            "id" SERIAL PRIMARY KEY,
            "name" character varying NOT NULL,
            "color" character varying,
            "icon" character varying,
            "categoryId" integer NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        )
    `);

    // Transactions table
    await queryRunner.query(`
        CREATE TABLE "transactions" (
            "id" SERIAL PRIMARY KEY,
            "amount" decimal(10,2) NOT NULL,
            "description" character varying NOT NULL,
            "date" date NOT NULL,
            "type" "public"."transaction_type_enum" NOT NULL DEFAULT 'EXPENSE',
            "categoryId" integer NOT NULL,
            "subCategoryId" integer,
            "userId" integer NOT NULL,
            "notes" character varying,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        )
    `);

    // Refresh Tokens table (keeping UUID for security)
    await queryRunner.query(`
        CREATE TABLE "refresh_tokens" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "token" character varying NOT NULL,
            "userId" integer NOT NULL,
            "expiresAt" TIMESTAMP NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_refresh_tokens" PRIMARY KEY ("id")
        )
    `);

    // Add foreign key constraints
    await queryRunner.query(`
        ALTER TABLE "user_role_mappings" 
        ADD CONSTRAINT "FK_user_role_mapping_user" 
        FOREIGN KEY ("userId") 
        REFERENCES "users"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
        ALTER TABLE "user_role_mappings" 
        ADD CONSTRAINT "FK_user_role_mapping_role" 
        FOREIGN KEY ("roleId") 
        REFERENCES "user_roles"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
        ALTER TABLE "sub_categories" 
        ADD CONSTRAINT "FK_sub_categories_category" 
        FOREIGN KEY ("categoryId") 
        REFERENCES "categories"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
        ALTER TABLE "transactions" 
        ADD CONSTRAINT "FK_transactions_category" 
        FOREIGN KEY ("categoryId") 
        REFERENCES "categories"("id") ON DELETE RESTRICT
    `);

    await queryRunner.query(`
        ALTER TABLE "transactions" 
        ADD CONSTRAINT "FK_transactions_sub_category" 
        FOREIGN KEY ("subCategoryId") 
        REFERENCES "sub_categories"("id") ON DELETE RESTRICT
    `);

    await queryRunner.query(`
        ALTER TABLE "transactions" 
        ADD CONSTRAINT "FK_transactions_user" 
        FOREIGN KEY ("userId") 
        REFERENCES "users"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
        ALTER TABLE "refresh_tokens" 
        ADD CONSTRAINT "FK_refresh_tokens_user" 
        FOREIGN KEY ("userId") 
        REFERENCES "users"("id") ON DELETE CASCADE
    `);
  }

public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints
    await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_refresh_tokens_user"`);
    await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_transactions_user"`);
    await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_transactions_sub_category"`);
    await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_transactions_category"`);
    await queryRunner.query(`ALTER TABLE "sub_categories" DROP CONSTRAINT "FK_sub_categories_category"`);
    await queryRunner.query(`ALTER TABLE "user_role_mappings" DROP CONSTRAINT "FK_user_role_mapping_role"`);
    await queryRunner.query(`ALTER TABLE "user_role_mappings" DROP CONSTRAINT "FK_user_role_mapping_user"`);

    // Drop tables
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TABLE "sub_categories"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "user_role_mappings"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    
    // Drop enum
    await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
  }
}
