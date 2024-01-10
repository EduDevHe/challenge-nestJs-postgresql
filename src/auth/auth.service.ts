import { Injectable } from '@nestjs/common';
import { AuthRepository } from './repositories/auth-repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { WithoutParameterException } from 'src/dto/without-parameter.exception';
import { AuthUnauthorizedException } from './exceptions/auth-unauthorized-exception';
@Injectable()
export class AuthService implements AuthRepository {
  constructor(private prisma: PrismaService) {}
  async createUser({
    username,
    email,
    password,
  }: CreateUserDto): Promise<CreateUserDto> {
    if (username === '')
      throw new WithoutParameterException('The Username must be valid');
    if (email === '')
      throw new WithoutParameterException('The email must be valid');
    if (password === '')
      throw new WithoutParameterException('The password must be valid');

    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    const thisEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new AuthUnauthorizedException('Username already exists');
    }

    if (thisEmail) {
      throw new AuthUnauthorizedException('Email already exists');
    }

    return this.prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }
}
