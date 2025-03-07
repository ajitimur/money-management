import { RoleType } from "../../src/entities/UserRole.entity";
import { Permission } from "../../src/types/permission";
import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRolePermission1741317553952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      // Get existing roles
      const roles = await queryRunner.query(`SELECT * FROM "user_roles"`);
        
      for (const role of roles) {
          let permissions: string[] = role.permissions.split(',');
          
          // Add account permissions based on role type
          if (role.name === RoleType.ADMIN) {
              // Admin gets all permissions
              permissions = Object.values(Permission);
          } else if (role.name === RoleType.USER) {
              // Add account permissions for regular user
              permissions = [
                  ...permissions,
                  Permission.CREATE_ACCOUNT,
                  Permission.READ_ACCOUNT,
                  Permission.UPDATE_ACCOUNT,
                  Permission.DELETE_ACCOUNT
              ];
              // Remove duplicates
              permissions = [...new Set(permissions)];
          }
          
          // Update the role with new permissions
          await queryRunner.query(`
              UPDATE "user_roles"
              SET "permissions" = $1
              WHERE "id" = $2
          `, [permissions.join(','), role.id]);
      }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       // Get existing roles
       const roles = await queryRunner.query(`SELECT * FROM "user_roles"`);
        
       for (const role of roles) {
           let permissions: string[] = role.permissions.split(',');
           
           // Remove account permissions
           permissions = permissions.filter(p => 
               p !== Permission.CREATE_ACCOUNT &&
               p !== Permission.READ_ACCOUNT &&
               p !== Permission.UPDATE_ACCOUNT &&
               p !== Permission.DELETE_ACCOUNT
           );
           
           // Update the role with filtered permissions
           await queryRunner.query(`
               UPDATE "user_roles"
               SET "permissions" = $1
               WHERE "id" = $2
           `, [permissions.join(','), role.id]);
       }
    }

}
