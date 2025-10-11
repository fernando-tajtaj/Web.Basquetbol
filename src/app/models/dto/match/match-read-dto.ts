import { MatchPlayerReadDto } from '../match-player/match-player-read-dto';
import { StatusReadDto } from '../status/status-read-dto';

export class MatchReadDto {
  uuid: string;
  uuidTeamHome: string;
  teamHomeName: string;
  uuidTeamAway: string;
  teamAwayName: string;
  scoreHome: number;
  scoreAway: number;
  foulHome: number;
  foulAway: number;
  quarter: number;
  matchDateTime: Date;
  status: StatusReadDto;
  matchPlayerReadDto?: MatchPlayerReadDto[];

  teamHomeLogo?: string;
  teamAwayLogo?: string;
}
