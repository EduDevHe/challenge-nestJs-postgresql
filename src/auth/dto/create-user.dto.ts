import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'The "username" field cannot be empty..' })
  @MinLength(4, {
    message: 'The "username" field must have at least 4 characters.',
  })
  @MaxLength(20, {
    message: 'O campo "username" não pode ter mais de 20 caracteres..',
  })
  username: string;

  @IsString()
  @IsEmail({}, { message: 'The "email" field must be a valid email address.' })
  @IsNotEmpty({ message: 'The "email" field cannot be empty.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'The "password" field cannot be empty.' })
  @MinLength(6, {
    message: 'The "password" field must have at least 6 characters.',
  })
  @MaxLength(30, {
    message: 'The "password" field cannot be longer than 30 characters.',
  })
  password: string;
}
