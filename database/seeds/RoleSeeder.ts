import { DataSource } from 'typeorm';
import { UserRole, RoleType } from '../../src/entities/UserRole.entity';
import { Permission } from '../../src/types/permission';

export class RoleSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const roleRepository = this.dataSource.getRepository(UserRole);

    const roles = [
      {
        name: RoleType.ADMIN,
        permissions: Object.values(Permission)
      },
      {
        name: RoleType.USER,
        permissions: [
          Permission.READ_CATEGORY,
          Permission.READ_SUBCATEGORY,
          Permission.CREATE_TRANSACTION,
          Permission.READ_TRANSACTION,
          Permission.UPDATE_TRANSACTION,
          Permission.DELETE_TRANSACTION
        ]
      }
    ];

    for (const roleData of roles) {
      const existingRole = await roleRepository.findOne({
        where: { name: roleData.name }
      });

      if (!existingRole) {
        const role = roleRepository.create(roleData);
        await roleRepository.save(role);
      }
    }
  }
} 