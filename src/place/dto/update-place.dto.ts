import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaceDto } from './create-place.dto';
import { IsString, Length } from 'class-validator';
export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {
  @IsString()
  @Length(1, 255)
  name?: string;

  @IsString()
  @Length(1, 255)
  state?: string;

  @IsString()
  @Length(1, 255)
  city?: string;
}
