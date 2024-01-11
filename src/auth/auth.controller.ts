import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { WithoutParameterException } from 'src/exceptions/without-parameter.exception';
import { AuthUnauthorizedException } from './exceptions/auth-unauthorized-exception';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createUser: CreateUserDto) {
    try {
      const { username, email, createdAt } =
        await this.authService.createUser(createUser);
      return {
        message: 'User created successfully',
        username,
        email,
        createdAt,
      };
    } catch (error) {
      if (
        error instanceof AuthUnauthorizedException ||
        WithoutParameterException
      ) {
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
  @Post('login')
  async validate(@Body() { email, password }) {
    try {
      const { token, login } = await this.authService.validateUser(
        email,
        password,
      );
      return {
        message: 'login successfully',
        token,
        login,
      };
    } catch (error) {
      if (
        error instanceof AuthUnauthorizedException ||
        WithoutParameterException
      ) {
        throw new HttpException(
          {
            status: error.getStatus(),
            error: error.message,
            details: error.message,
          },
          error.getStatus(),
        );
      }
      if (error instanceof UnauthorizedException) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Invalid credentials',
            details: 'Invalid credentials',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
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
