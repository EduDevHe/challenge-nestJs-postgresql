import { CreatePlaceDto } from '../dto/create-place.dto';
import { GetPlaceDto } from '../dto/get-place.dto';
export abstract class PlaceReository {
  abstract create({
    name,
    city,
    state,
  }: CreatePlaceDto): Promise<CreatePlaceDto>;

  abstract findAll(): Promise<GetPlaceDto[]>;
  abstract findOne(id: number): Promise<GetPlaceDto>;
  abstract search({
    name,
    city,
    state,
  }: CreatePlaceDto): Promise<GetPlaceDto[]>;
}
