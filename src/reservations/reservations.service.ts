import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CreateReservationDto, UpdateReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(@InjectRepository(Reservation) private repo: Repository<Reservation>) { }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } })
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Reservation not found');
    return item;
  }

  create(dto: CreateReservationDto) {
    return this.repo.save(this.repo.create(dto))
  }

  async update(id: number, dto: UpdateReservationDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const item = await this.findOne(id); return this.repo.remove(item)
  }
}
