import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../users/user.entity';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already exists');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashed });
    await this.userRepo.save(user);
    return this.signToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password)))
      throw new UnauthorizedException('Invalid credentials');
    return this.signToken(user);
  }

  async seedSuperAdmin() {
    const exists = await this.userRepo.findOne({ where: { email: 'superadmin@email.com' } });
    if (!exists) {
      const hashed = await bcrypt.hash('Super123!', 10);
      await this.userRepo.save(this.userRepo.create({
        name: 'Superadmin', email: 'superadmin@email.com',
        password: hashed, role: UserRole.SUPERADMIN,
      }));
      console.log('SuperAdmin created successfully: superadmin@email.com / Super123!');
    }
  }

  private signToken(user: User) {
    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }
}
