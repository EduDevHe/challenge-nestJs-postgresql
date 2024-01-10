import { CreateUserDto } from '../dto/create-user.dto';

export abstract class AuthRepository {
  abstract createUser({
    username,
    email,
    password,
  }: CreateUserDto): Promise<CreateUserDto>;
}
