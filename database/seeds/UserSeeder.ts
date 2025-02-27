import { DataSource } from 'typeorm';
import { User } from '../../src/entities/User.entity';
import { UserRole, RoleType } from '../../src/entities/UserRole.entity';
import { hash } from 'bcrypt';

export class UserSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const userRepository = this.dataSource.getRepository(User);
    const roleRepository = this.dataSource.getRepository(UserRole);

    const users = [
      {
        email: 'admin@example.com',
        password: process.env.ADMIN_PASSWORD as string,
        firstName: 'Admin',
        lastName: 'User',
        roles: [RoleType.ADMIN]
      },
    ];

    for (const userData of users) {
      const existingUser = await userRepository.findOne({
        where: { email: userData.email }
      });

      if (!existingUser) {
        // Hash password
        const hashedPassword = await hash(userData.password, 10);

        // Get roles
        const roles = await Promise.all(
          userData.roles.map(roleName => 
            roleRepository.findOne({ where: { name: roleName } })
          )
        );

        const user = userRepository.create({
          email: userData.email,
          password: hashedPassword,
          firstName: userData.firstName,
          lastName: userData.lastName,
          roles: roles.filter(role => role !== null) as UserRole[]
        });

        await userRepository.save(user);
      }
    }
  }
} 