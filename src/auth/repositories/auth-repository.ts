import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
export abstract class AuthRepository {
  abstract createUser({
    username,
    email,
    password,
  }: CreateUserDto): Promise<GetUserDto>;

  abstract validateUser(
    email: string,
    password: string,
  ): Promise<{ token: string; login: boolean }>;

  abstract validateToken(id: number): Promise<GetUserDto>;
}
