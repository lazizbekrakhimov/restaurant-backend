import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './gallery.entity';
import { CreateGalleryDto } from './dto/gallery.dto';

@Injectable()
export class GalleryService {
  constructor(@InjectRepository(Gallery) private repo: Repository<Gallery>) {}
  findAll() { return this.repo.find({ order: { createdAt: 'DESC' } }); }
  create(dto: CreateGalleryDto) { return this.repo.save(this.repo.create(dto)); }
  async remove(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    return this.repo.remove(item);
  }
}
