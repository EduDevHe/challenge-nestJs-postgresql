import { CreatePlaceDto } from '../dto/create-place.dto';
export abstract class PlaceReository {
  abstract create({
    name,
    city,
    state,
  }: CreatePlaceDto): Promise<CreatePlaceDto>;

  abstract findAll(): Promise<CreatePlaceDto[]>;
}
