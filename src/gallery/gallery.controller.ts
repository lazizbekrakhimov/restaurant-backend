import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/gallery.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private service: GalleryService) { }
  @Get() findAll() {
    return this.service.findAll()
  }
  @Post() @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) create(@Body() dto: CreateGalleryDto) {
    return this.service.create(dto)
  }
  @Delete(':id') @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
