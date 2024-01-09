import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @Length(1, 255)
  @IsNotEmpty()
  @IsString()
  city: string;

  @Length(1, 255)
  @IsNotEmpty()
  @IsString()
  state: string;
}
