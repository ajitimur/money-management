import { AppDataSource } from '../config/database';
import { UserRole, RoleType } from '../entities/UserRole.entity';
import { Permission } from '../types/permission';
import { AppError } from '../types/error';

export class RoleService {
  private roleRepository = AppDataSource.getRepository(UserRole);

  async createRole(name: RoleType, permissions: Permission[]): Promise<UserRole> {
    const existingRole = await this.roleRepository.findOne({
      where: { name }
    });

    if (existingRole) {
      throw new AppError('Role already exists', 400);
    }

    const role = this.roleRepository.create({
      name,
      permissions
    });

    return await this.roleRepository.save(role);
  }

  async createDefaultRoles(): Promise<void> {
    // Create admin role
    const adminPermissions = Object.values(Permission);
    await this.createRoleIfNotExists(RoleType.ADMIN, adminPermissions);

    // Create user role
    const userPermissions = [
      Permission.READ_CATEGORY,
      Permission.READ_SUBCATEGORY,
      Permission.CREATE_TRANSACTION,
      Permission.READ_TRANSACTION,
      Permission.UPDATE_TRANSACTION,
      Permission.DELETE_TRANSACTION
    ];
    await this.createRoleIfNotExists(RoleType.USER, userPermissions);
  }

  private async createRoleIfNotExists(name: RoleType, permissions: Permission[]): Promise<void> {
    const existing = await this.roleRepository.findOne({
      where: { name }
    });

    if (!existing) {
      await this.createRole(name, permissions);
    }
  }
} 