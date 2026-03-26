import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  findAll() {
    return this.repo.find({ select: ['id', 'name', 'email', 'phone', 'role', 'createdAt'] });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id }, select: ['id', 'name', 'email', 'phone', 'role', 'createdAt'] });
    if (!user) throw new NotFoundException('User not found');
    return user
  }
  
  async remove(id: number) {
    await this.repo.delete(id); return { message: 'Deleted' }
  }
}
