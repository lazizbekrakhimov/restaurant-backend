import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private service: MenuService) { }
  @Get() @ApiQuery({ name: 'categoryId', required: false }) findAll(@Query('categoryId') categoryId?: string) {
    return this.service.findAll(categoryId ? +categoryId : undefined)
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @Post() @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) create(@Body() dto: CreateMenuItemDto) {
    return this.service.create(dto)
  }

  @Put(':id') @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) update(@Param('id') id: string, @Body() dto: UpdateMenuItemDto) {
    return this.service.update(+id, dto)
  }

  @Delete(':id') @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
