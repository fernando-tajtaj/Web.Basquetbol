import { CityReadDto } from '../city/city-read-dto';

export class TeamReadDto {
  uuid: string;
  name: string;
  city?: CityReadDto;
  logo: string;
}
