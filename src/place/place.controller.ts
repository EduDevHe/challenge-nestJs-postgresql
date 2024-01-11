import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PlaceNotFoundException } from './exceptions/place-not-found.exception';
import { WithoutParameterException } from 'src/exceptions/without-parameter.exception';

import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post('create')
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    try {
      const place = await this.placeService.create(createPlaceDto);
      return { message: 'place created successfully', place };
    } catch (error) {
      if (error instanceof WithoutParameterException) {
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

  @Get('all')
  async findAll() {
    try {
      return await this.placeService.findAll();
    } catch (error) {
      if (error instanceof PlaceNotFoundException) {
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const place = await this.placeService.findOne(parseInt(id));
      return { place };
    } catch (error) {
      if (error instanceof PlaceNotFoundException) {
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
  @Get()
  async search(
    @Query('name') name: string,
    @Query('city') city: string,
    @Query('state') state: string,
  ) {
    try {
      return this.placeService.search(name, city, state);
    } catch (error) {
      if (error instanceof PlaceNotFoundException) {
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
  @Patch(':id')
  @UseGuards(AuthGuard(), JwtGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    try {
      const place = await this.placeService.update(
        parseInt(id),
        updatePlaceDto,
      );

      return { message: 'Updatedplace', place };
    } catch (error) {
      if (error instanceof PlaceNotFoundException) {
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
  @Delete(':id')
  @UseGuards(AuthGuard(), JwtGuard)
  async remove(@Param('id') id: string) {
    try {
      const place = await this.placeService.remove(parseInt(id));

      return { message: 'Deleted place', place };
    } catch (error) {
      if (error instanceof PlaceNotFoundException) {
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
