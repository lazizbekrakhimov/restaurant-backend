import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactsService {
  constructor(@InjectRepository(Contact) private repo: Repository<Contact>) { }

  findAll() { return this.repo.find({ order: { createdAt: 'DESC' } }); }

  create(dto: CreateContactDto) { return this.repo.save(this.repo.create(dto)); }

  async markRead(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    item.isRead = true;
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    return this.repo.remove(item);
  }
}
