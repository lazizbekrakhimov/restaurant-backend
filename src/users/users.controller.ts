import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) { }

  @Get() findAll() {
    return this.service.findAll()
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }
  
  @Delete(':id') remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
