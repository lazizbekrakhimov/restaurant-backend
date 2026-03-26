import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto, UpdateReservationDto } from './dto/reservation.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private service: ReservationsService) { }
  @Post() create(@Body() dto: CreateReservationDto) {
    return this.service.create(dto)
  }

  @Get() @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) findAll() {
    return this.service.findAll()
  }

  @Get(':id') @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @Put(':id') @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) update(@Param('id') id: string, @Body() dto: UpdateReservationDto) {
    return this.service.update(+id, dto)
  }

  @Delete(':id') @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
