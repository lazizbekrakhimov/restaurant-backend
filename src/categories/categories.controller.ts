import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/category.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Post() @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) create(@Body() dto: CreateCategoryDto) { return this.service.create(dto); }
  @Delete(':id') @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) remove(@Param('id') id: string) { return this.service.remove(+id); }
}
