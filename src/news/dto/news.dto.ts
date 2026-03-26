import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNewsDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsString()
  authorName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  authorAvatar?: string;

}
