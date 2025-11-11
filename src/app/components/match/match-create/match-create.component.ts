import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus, faM } from '@fortawesome/free-solid-svg-icons';

import { TeamReadDto } from '../../../models/dto/team/team-read-dto';
import { PlayerReadDto } from '../../../models/dto/player/player-read-dto';
import { MatchCreateDto } from '../../../models/dto/match/match-create-dto';
import { MatchUpdateDto } from '../../../models/dto/match/match-update-dto';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusService } from '../../../services/status/status.service';
import { TeamService } from '../../../services/team/team.service';
import { MatchService } from '../../../services/match/match.service';
import { PlayerService } from '../../../services/player/player.service';
import { StatusReadDto } from '../../../models/dto/status/status-read-dto';

interface MatchPlayerForm {
  uuidPlayer: string;
  uuidTeam: string;
  teamName: string;
  name: string;
  position: any;
  isStarter: boolean;
  score?: number;
  fouls?: number;
  points?: number;
}

@Component({
  selector: 'app-match-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './match-create.component.html',
  styleUrl: './match-create.component.css',
})
export class MatchCreateComponent implements OnInit {
  form!: FormGroup;
  uuid: string | null = null;
  userName: string = '';
  status: StatusReadDto[] = [];
  teams: TeamReadDto[] = [];
  homePlayers: PlayerReadDto[] = [];
  awayPlayers: PlayerReadDto[] = [];
  isEdit = false;

  faPlus = faPlus;
  faMinus = faMinus;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private statusService: StatusService,
    private teamService: TeamService,
    private playerService: PlayerService,
    private matchService: MatchService,
    private fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUsername() ?? 'Invitado';
    this.initForm();
    this.loadStatus();
    this.loadTeams();
    this.checkEditMode();
    this.setupTeamChangeListeners();
  }

  private initForm(): void {
    this.form = this.fb.group(
      {
        datetime: ['', Validators.required],
        uuidTeamHome: ['', Validators.required],
        uuidTeamAway: ['', Validators.required],
        uuidStatus: ['', Validators.required],
        scoreHome: [0],
        scoreAway: [0],
        foulHome: [0],
        foulAway: [0],
        quarter: [0],
        matchPlayers: this.fb.array([]),
      },
      { validators: this.validateDifferentTeams }
    );
  }

  private checkEditMode(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    if (this.uuid) {
      this.isEdit = true;
      this.matchService.getById(this.uuid).subscribe({
        next: (match) => {
          this.form.patchValue({
            datetime: match.matchDateTime,
            uuidTeamHome: match.uuidTeamHome,
            uuidTeamAway: match.uuidTeamAway,
            uuidStatus: match.status.uuid,
            scoreHome: match.scoreHome ?? 0,
            scoreAway: match.scoreAway ?? 0,
            foulHome: match.foulHome ?? 0,
            foulAway: match.foulAway ?? 0,
            quarter: match.quarter ?? 0,
          });

          // NO cargar jugadores disponibles en modo edición
          // Los jugadores ya seleccionados se cargan directamente al FormArray
          if (match.matchPlayerReadDto && match.matchPlayerReadDto.length) {
            this.matchPlayersArray.clear();
            match.matchPlayerReadDto.forEach((mp: any) => {
              this.playerService.getById(mp.uuidPlayer).subscribe((player) => {
                this.matchPlayersArray.push(
                  this.fb.group({
                    teamName: [player.teamName],
                    name: [mp.playerName],
                    position: [mp.position],
                    isStarter: [mp.isStarter],
                  })
                );
              });
            });
          }
        },
        error: (err) => console.error('Error loading match:', err),
      });
    }
  }

  private setupTeamChangeListeners(): void {
    // Solo cargar jugadores si NO estamos en modo edición
    this.form.get('uuidTeamHome')?.valueChanges.subscribe((uuid) => {
      if (uuid && !this.isEdit) this.loadPlayers(uuid, 'home');
    });
    this.form.get('uuidTeamAway')?.valueChanges.subscribe((uuid) => {
      if (uuid && !this.isEdit) this.loadPlayers(uuid, 'away');
    });
  }

  get matchPlayersArray(): FormArray {
    return this.form.get('matchPlayers') as FormArray;
  }

  loadStatus(): void {
    this.statusService.getAll().subscribe((data) => (this.status = data));
  }

  loadTeams(): void {
    this.teamService.getAll().subscribe({
      next: (data) => (this.teams = data),
      error: (err) => console.error('Error loading teams:', err),
    });
  }

  loadPlayers(teamUuid: string, type: 'home' | 'away'): void {
    this.playerService
      .getByTeam(teamUuid)
      .pipe(catchError(() => of([])))
      .subscribe((players) => {
        if (type === 'home') this.homePlayers = players;
        else this.awayPlayers = players;
      });
  }

  validateDifferentTeams(group: AbstractControl): ValidationErrors | null {
    const home = group.get('uuidTeamHome')?.value;
    const away = group.get('uuidTeamAway')?.value;
    return home && away && home === away ? { sameTeam: true } : null;
  }

  addPlayerToMatch(player: PlayerReadDto, isStarter: boolean, teamUuid: string): void {
    if (this.isPlayerSelected(player.uuid)) return;
    const teamName = this.teams.find((t) => t.uuid === teamUuid)?.name ?? '';
    this.matchPlayersArray.push(
      this.fb.group({
        uuidPlayer: [player.uuid],
        uuidTeam: [teamUuid],
        teamName: [teamName],
        name: [player.fullName],
        position: [player.position],
        isStarter: [isStarter],
        score: [0],
        fouls: [0],
        points: [0],
      })
    );
  }

  isPlayerSelected(uuidPlayer: string): boolean {
    return this.matchPlayersArray.controls.some((c) => c.value.uuidPlayer === uuidPlayer);
  }

  removePlayerFromMatch(uuidPlayer: string): void {
    const index = this.matchPlayersArray.controls.findIndex(
      (c) => c.value.uuidPlayer === uuidPlayer
    );
    if (index > -1) this.matchPlayersArray.removeAt(index);
  }

  // Métodos para el marcador
  incrementScore(team: 'home' | 'away', points: number): void {
    const field = team === 'home' ? 'scoreHome' : 'scoreAway';
    const currentValue = this.form.get(field)?.value ?? 0;
    this.form.patchValue({ [field]: currentValue + points });
  }

  decrementScore(team: 'home' | 'away', points: number): void {
    const field = team === 'home' ? 'scoreHome' : 'scoreAway';
    const currentValue = this.form.get(field)?.value ?? 0;
    this.form.patchValue({ [field]: currentValue - points });
  }

  incrementFoul(team: 'home' | 'away'): void {
    const field = team === 'home' ? 'foulHome' : 'foulAway';
    const currentValue = this.form.get(field)?.value ?? 0;
    this.form.patchValue({ [field]: currentValue + 1 });
  }

  decrementFoul(team: 'home' | 'away'): void {
    const field = team === 'home' ? 'foulHome' : 'foulAway';
    const currentValue = this.form.get(field)?.value ?? 0;
    this.form.patchValue({ [field]: currentValue - 1 });
  }

  updateMatchStatusByQuarter(quarter: number): void {
    let newStatus: any;

    if (quarter === 0) {
      newStatus = this.status.find((s) => s.name.toLowerCase() === 'pendiente');
    } else if (quarter >= 1 && quarter <= 3) {
      newStatus = this.status.find((s) => s.name.toLowerCase() === 'en juego');
    } else if (quarter === 4) {
      newStatus = this.status.find((s) => s.name.toLowerCase() === 'finalizado');
    }

    if (newStatus) {
      this.form.patchValue({ uuidStatus: newStatus.uuid });
    }
  }

  incrementQuarter(): void {
    const currentQuarter = this.form.get('quarter')?.value ?? 0;
    if (currentQuarter < 4) {
      const newQuarter = currentQuarter + 1;
      this.form.patchValue({ quarter: newQuarter });
      this.updateMatchStatusByQuarter(newQuarter);
    }
  }

  decrementQuarter(): void {
    const currentQuarter = this.form.get('quarter')?.value ?? 0;
    if (currentQuarter > 0) {
      const newQuarter = currentQuarter - 1;
      this.form.patchValue({ quarter: newQuarter });
      this.updateMatchStatusByQuarter(newQuarter);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isEdit ? this.updateMatch() : this.createMatch();
  }

  private updateMatch(): void {
    const formValue = this.form.value;
    const matchUpdateDto: MatchUpdateDto = {
      scoreHome: formValue.scoreHome ?? 0,
      scoreAway: formValue.scoreAway ?? 0,
      foulHome: formValue.foulHome ?? 0,
      foulAway: formValue.foulAway ?? 0,
      quarter: formValue.quarter ?? 0,
      uuidStatus: formValue.uuidStatus,
      updatedBy: this.userName,
    };
    this.matchService.update(this.uuid!, matchUpdateDto).subscribe({
      next: () => this.router.navigate(['/match']),
      error: (err) => console.error('Error updating match:', err),
    });
  }

  private createMatch(): void {
    const formValue = this.form.value;
    const teamHome = this.teams.find((t) => t.uuid === formValue.uuidTeamHome);
    const teamAway = this.teams.find((t) => t.uuid === formValue.uuidTeamAway);

    const matchCreateDto: MatchCreateDto = {
      matchDateTime: formValue.datetime,
      uuidTeamHome: formValue.uuidTeamHome,
      teamHome: teamHome?.name ?? '',
      uuidTeamAway: formValue.uuidTeamAway,
      teamAway: teamAway?.name ?? '',
      uuidStatus: formValue.uuidStatus,
      createdBy: this.userName,
      matchPlayerCreateDto: (this.matchPlayersArray.value as MatchPlayerForm[]).map(
        (mp: MatchPlayerForm) => ({
          uuidPlayer: mp.uuidPlayer,
          playerName: mp.name,
          isStarter: mp.isStarter,
        })
      ),
    };

    this.matchService.create(matchCreateDto).subscribe({
      next: () => this.router.navigate(['/match']),
      error: (err) => console.error('Error creating match:', err),
    });
  }
}
