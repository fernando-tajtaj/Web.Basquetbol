export class PlayerUpdateDto {
  uuidTeam: string = '';
  team: string = '';
  fullName: string = '';
  number?: number;
  uuidPosition?: string;
  height?: number;
  age?: number;
  uuidNationality?: string;
  updatedBy?: string;
}
