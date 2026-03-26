import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(News) private repo: Repository<News>) { }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('News not found');
    return item;
  }

  create(dto: CreateNewsDto) {
    return this.repo.save(this.repo.create(dto))
  }

  async remove(id: number) {
    const item = await this.findOne(id)
    return this.repo.remove(item)
  }
}
