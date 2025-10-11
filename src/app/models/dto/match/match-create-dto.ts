import { MatchPlayerCreateDto } from '../match-player/match-player-create-dto';

export class MatchCreateDto {
  uuidTeamHome: string;
  teamHome: string;
  uuidTeamAway: string;
  teamAway: string;
  matchDateTime: Date;
  uuidStatus: string;
  matchPlayerCreateDto?: MatchPlayerCreateDto[];
  createdBy: string;
}
