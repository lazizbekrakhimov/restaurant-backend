import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ReservationStatus } from '../reservation.entity';

export class CreateReservationDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  guests: number;

  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsString()
  time: string;

  @ApiProperty()
  @IsString()
  location: string;
}

export class UpdateReservationDto {
  @ApiProperty({ enum: ReservationStatus, required: false })
  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;
}