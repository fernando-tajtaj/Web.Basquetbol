import { NationalityReadDto } from '../nationality/nationality-read-dto';
import { PositionReadDto } from '../position/position-read-dto';

export class PlayerReadDto {
  uuid: string = '';
  uuidTeam: string = '';
  teamName: string = '';
  fullName: string = '';
  number?: number;
  position?: PositionReadDto;
  height?: number;
  age?: number;
  nationality?: NationalityReadDto;
}
