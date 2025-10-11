export class PlayerCreateDto {
  uuidTeam: string = '';
  team: string = '';
  fullName: string = '';
  number?: number;
  uuidPosition?: string;
  height?: number;
  age?: number;
  uuidNationality?: string;
  createdBy?: string;
}
