export class MatchUpdateDto {
  scoreHome: number;
  scoreAway: number;
  foulHome: number;
  foulAway: number;
  quarter: number;
  uuidStatus: string;
  updatedBy?: string;
}
