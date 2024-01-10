import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { WithoutParameterException } from 'src/dto/without-parameter.exception';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createUser: CreateUserDto) {
    try {
      const place = await this.authService.createUser(createUser);
      return { place };
    } catch (error) {
      if (error instanceof UnauthorizedException || WithoutParameterException) {
        throw new HttpException(
          {
            status: error.getStatus(),
            error: error.message,
            details: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          details: 'An internal server error occurred. Please try again later.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
