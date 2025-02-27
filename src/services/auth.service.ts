import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User.entity';
import { RefreshToken } from '../entities/RefreshToken.entity';
import { config } from '../config';
import { AppError } from '../types/error';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  private refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

  async register(registerDto: RegisterDto): Promise<{ user: User; accessToken: string }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new AppError('Email already exists', 400);
    }

    const hashedPassword = await hash(registerDto.password, 10);
    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    const accessToken = this.generateAccessToken(user);

    return { user, accessToken };
  }

  async login(loginDto: LoginDto): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  private generateAccessToken(user: User): string {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour from now
    return sign(
      { userId: user.id, email: user.email, expiresAt },
      config.jwt.secret as string,
      { expiresIn: expiresAt.getTime() - Date.now() }
    );
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const token = sign({}, config.jwt.secret);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour from now

    const refreshToken = this.refreshTokenRepository.create({
      token,
      expiresAt,
      userId: user.id,
    });

    await this.refreshTokenRepository.save(refreshToken);
    return token;
  }
} 