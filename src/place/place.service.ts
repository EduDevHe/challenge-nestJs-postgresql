import { Injectable } from '@nestjs/common';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceRepository } from './repositories/place-repository';
import { PlaceNotFoundException } from './exceptions/place-not-found.exception';
import { GetPlaceDto } from './dto/get-place.dto';
import { WithoutParameterException } from 'src/exceptions/without-parameter.exception';

@Injectable()
export class PlaceService implements PlaceRepository {
  constructor(private prisma: PrismaService) {}

  async create({ name, city, state }: CreatePlaceDto): Promise<CreatePlaceDto> {
    if (name === '')
      throw new WithoutParameterException('The name must be valid');
    if (city === '')
      throw new WithoutParameterException('The city must be valid');
    if (state === '')
      throw new WithoutParameterException('The state must be valid');
    const place = await this.prisma.place.create({
      data: {
        name,
        city,
        state,
      },
    });

    return place;
  }
  async findAll(): Promise<GetPlaceDto[]> {
    const allPlaces = await this.prisma.place.findMany();

    if (!allPlaces || allPlaces.length === 0) {
      throw new PlaceNotFoundException();
    }

    return allPlaces;
  }

  async findOne(id: number): Promise<GetPlaceDto> {
    const place = await this.prisma.place.findUnique({
      where: {
        id: id,
      },
    });

    if (!place) {
      throw new PlaceNotFoundException('Place not found');
    }

    return place;
  }

  async search(
    name: string,
    city: string,
    state: string,
  ): Promise<GetPlaceDto[]> {
    if (!name && !city && !state) {
      throw new WithoutParameterException(
        'You must pass a parameter to the search',
      );
    }

    const searchPlaces = await this.prisma.place.findMany({
      where: {
        name: {
          contains: name,
        },
        city: {
          contains: city,
        },
        state: {
          contains: state,
        },
      },
    });

    if (!searchPlaces || searchPlaces.length === 0) {
      throw new PlaceNotFoundException();
    }
    return searchPlaces;
  }
  async update(
    id: number,
    updatePlaceDto: UpdatePlaceDto,
  ): Promise<GetPlaceDto> {
    const place = await this.prisma.place.findUnique({
      where: {
        id: id,
      },
    });

    if (!place) {
      throw new PlaceNotFoundException('Place not found');
    }

    const updatedPlace = await this.prisma.place.update({
      where: {
        id: id,
      },
      data: {
        ...updatePlaceDto,
      },
    });
    return updatedPlace;
  }

  async remove(id: number): Promise<GetPlaceDto> {
    const place = await this.prisma.place.findUnique({
      where: {
        id: id,
      },
    });

    if (!place) {
      throw new PlaceNotFoundException('Place not found');
    }

    return await this.prisma.place.delete({
      where: {
        id: id,
      },
    });
  }
}
