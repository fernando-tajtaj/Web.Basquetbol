import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../../services/player/player.service';
import { PlayerCreateDto } from '../../../models/dto/player/player-create-dto';
import { PlayerUpdateDto } from '../../../models/dto/player/player-update-dto';
import { TeamReadDto } from '../../../models/dto/team/team-read-dto';
import { AuthService } from '../../../services/auth/auth.service';
import { TeamService } from '../../../services/team/team.service';
import { PositionReadDto } from '../../../models/dto/position/position-read-dto';
import { NationalityReadDto } from '../../../models/dto/nationality/nationality-read-dto';
import { PositionService } from '../../../services/position/position.service';
import { NationalityService } from '../../../services/nationality/nationality.service';

@Component({
  selector: 'app-player-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './player-create.component.html',
  styleUrl: './player-create.component.css',
})
export class PlayerCreateComponent {
  form: FormGroup;
  isEdit: boolean = false;
  uuid: string | null = null;
  teams: TeamReadDto[] = [];
  positions: PositionReadDto[] = [];
  nationalities: NationalityReadDto[] = [];
  userName: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private playerService: PlayerService,
    private teamService: TeamService,
    private positionService: PositionService,
    private nationalityService: NationalityService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      uuidTeam: ['', Validators.required],
      fullName: ['', Validators.required],
      number: ['', Validators.required],
      uuidPosition: ['', Validators.required],
      height: ['', Validators.required],
      age: ['', Validators.required],
      uuidNationality: ['', Validators.required],
    });

    this.userName = this.authService.getUsername() ?? 'Invitado';

    this.uuid = this.route.snapshot.paramMap.get('uuid');

    if (this.uuid) {
      this.isEdit = true;
      this.playerService.getById(this.uuid).subscribe((player) => {
        const mappedPlayer = {
          ...player,
          uuidPosition: player.position?.uuid || '',
          uuidNationality: player.nationality?.uuid || '',
        };

        this.form.patchValue(mappedPlayer);
      });
    }

    this.getTeams();
    this.getPositions();
    this.getNationalities();
  }

  getTeams(): void {
    this.teamService.getAll().subscribe((data) => (this.teams = data));
  }

  getPositions(): void {
    this.positionService.getAll().subscribe((data) => (this.positions = data));
  }

  getNationalities(): void {
    this.nationalityService.getAll().subscribe((data) => (this.nationalities = data));
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const selectedTeam = this.teams.find((t) => t.uuid === this.form.value.uuidTeam);

    // Enriquecer el formulario con el nombre del equipo
    const teamName = selectedTeam ? selectedTeam.name : '';

    if (this.isEdit && this.uuid) {
      const updateDto: PlayerUpdateDto = {
        ...this.form.value,
        team: teamName,
        updatedBy: this.userName,
      };

      this.playerService
        .update(this.uuid, updateDto)
        .subscribe(() => this.router.navigate(['/player']));
    } else {
      const createDto: PlayerCreateDto = {
        ...this.form.value,
        team: teamName,
        createdBy: this.userName,
      };

      this.playerService.create(createDto).subscribe(() => this.router.navigate(['/player']));
    }
  }
}
