import { UserResponseDto } from '../user/user-response-dto';

export class LoginResponseDto {
  result: boolean;
  message: string;
  token: string;
  user: UserResponseDto;
}
