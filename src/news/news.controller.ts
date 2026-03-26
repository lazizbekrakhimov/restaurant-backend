import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/news.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private service: NewsService) { }

  @Get() findAll() {
    return this.service.findAll()
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @Post() @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) create(@Body() dto: CreateNewsDto) {
    return this.service.create(dto)
  }

  @Delete(':id') @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
