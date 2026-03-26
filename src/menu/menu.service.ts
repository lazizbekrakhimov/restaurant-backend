import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(@InjectRepository(MenuItem) private repo: Repository<MenuItem>) {}
  findAll(categoryId?: number) {
    const where = categoryId ? { category: { id: categoryId } } : {};
    return this.repo.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  create(dto: CreateMenuItemDto) {
    const item = this.repo.create({ ...dto, category: dto.categoryId ? { id: dto.categoryId } as any : null });
    return this.repo.save(item);
  }

  async update(id: number, dto: UpdateMenuItemDto) {
    await this.findOne(id);
    await this.repo.update(id, { ...dto, category: dto.categoryId ? { id: dto.categoryId } as any : undefined });
    return this.findOne(id);
  }
  
  async remove(id: number) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }
}
