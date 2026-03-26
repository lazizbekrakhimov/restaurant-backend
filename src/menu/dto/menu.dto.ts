import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMenuItemDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty() @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number) @IsNumber()
  categoryId?: number;
}
export class UpdateMenuItemDto extends CreateMenuItemDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
