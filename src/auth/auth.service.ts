import { Injectable } from '@nestjs/common';
import { AuthRepository } from './repositories/auth-repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { WithoutParameterException } from 'src/exceptions/without-parameter.exception';
import { AuthUnauthorizedException } from './exceptions/auth-unauthorized-exception';
import { GetUserDto } from './dto/get-user.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements AuthRepository {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = 10;
    return bcrypt.hash(password, salt);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async createUser({
    username,
    email,
    password,
  }: CreateUserDto): Promise<GetUserDto> {
    if (username === '')
      throw new WithoutParameterException('The Username must be valid');
    if (email === '')
      throw new WithoutParameterException('The email must be valid');
    if (password === '')
      throw new WithoutParameterException('The password must be valid');

    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    const userEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new AuthUnauthorizedException('Username already exists');
    }

    if (userEmail) {
      throw new AuthUnauthorizedException('Email already exists');
    }

    const hash = await this.hashPassword(password);

    return this.prisma.user.create({
      data: {
        username,
        email,
        password: hash,
      },
    });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ token: string; login: boolean }> {
    if (email === '') {
      throw new WithoutParameterException('The email must be valid');
    }
    if (password === '') {
      throw new WithoutParameterException('The password must be valid');
    }
    console.log(email);
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const payload = { email: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    const passwordCheck = await this.verifyPassword(password, user.password);
    const emailCheck = email === user.email ? true : false;
    if (emailCheck && passwordCheck) {
      return { token, login: true };
    } else {
      throw new AuthUnauthorizedException('Invalid credentials');
    }
  }

  async validateToken(id: number): Promise<GetUserDto> {
    const user = this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new AuthUnauthorizedException();
    }

    return user;
  }
}
