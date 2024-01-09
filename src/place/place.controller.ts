import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
// import { UpdatePlaceDto } from './dto/update-place.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PlaceNotFoundException } from './exceptions/place-not-found.exception';
import { CreatPlaceException } from './exceptions/creat-place.exception';
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) { }

  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    try {
      const place = await this.placeService.create(createPlaceDto);
      return { message: 'place created successfully', place };
    } catch (error) {
      if (error instanceof CreatPlaceException) {
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

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    //   return this.placeService.update(+id, updatePlaceDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.placeService.remove(+id);
    // }
  }
