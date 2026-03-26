import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/contact.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private service: ContactsService) { }

  @Post() create(@Body() dto: CreateContactDto) {
    return this.service.create(dto)
  }
  @Get() @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) findAll() {
    return this.service.findAll()
  }
  @Patch(':id/read') @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) markRead(@Param('id') id: string) {
    return this.service.markRead(+id)
  }
  @Delete(':id') @ApiBearerAuth() @UseGuards(JwtAuthGuard, AdminGuard) remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
