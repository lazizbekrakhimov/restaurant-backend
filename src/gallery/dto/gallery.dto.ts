import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGalleryDto {
  @ApiProperty()
  @IsString()
  image: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;
}
