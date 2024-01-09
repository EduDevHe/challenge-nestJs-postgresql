import { Injectable } from '@nestjs/common';
// import { UpdatePlaceDto } from './dto/update-place.dto';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceReository } from './repositories/place-repository';
import { PlaceNotFoundException } from './exceptions/place-not-found.exception';
import { CreatPlaceException } from './exceptions/creat-place.exception';
import { GetPlaceDto } from './dto/get-place.dto';
@Injectable()
export class PlaceService implements PlaceReository {
  constructor(private prisma: PrismaService) {}

  async create({ name, city, state }: CreatePlaceDto): Promise<CreatePlaceDto> {
    if (name === '') throw new CreatPlaceException('The name must be valid');
    if (city === '') throw new CreatPlaceException('The city must be valid');
    if (state === '') throw new CreatPlaceException('The state must be valid');
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

  // update(id: number, updatePlaceDto: UpdatePlaceDto) {
  //   return `This action updates a #${id} place`;
  // }

  remove(id: number) {
    return `This action removes a #${id} place`;
  }
}
