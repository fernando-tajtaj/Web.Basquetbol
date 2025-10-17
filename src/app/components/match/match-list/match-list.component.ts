import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatchPlayerReadDto } from '../../../models/dto/match-player/match-player-read-dto';
import { MatchReadDto } from '../../../models/dto/match/match-read-dto';
import { TeamService } from '../../../services/team/team.service';
import { MatchService } from '../../../services/match/match.service';
import { MatchPlayerService } from '../../../services/match-player/match-player.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBoxOpen, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-match-list',
  imports: [CommonModule, NgClass, FormsModule, FontAwesomeModule],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.css',
})
export class MatchListComponent {
  faBoxOpen = faBoxOpen;
  faPencil = faPencil;
  faTrash = faTrash;
  searchTerm: string = '';
  teamHomeLogo: String;
  teamAwayLogo: String;
  selectedMatch?: MatchReadDto;
  matches: MatchReadDto[] = [];
  matchPlayers: MatchPlayerReadDto[] = [];
  filteredMatches: MatchReadDto[] = [];

  constructor(
    private teamService: TeamService,
    private matchService: MatchService,
    private matchPlayerService: MatchPlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches() {
    this.matchService
      .getAll()
      .pipe(
        switchMap((matches) => {
          if (matches.length === 0) return of([]);

          const teamObservables = matches.flatMap((m) => [
            this.teamService.getById(m.uuidTeamHome).pipe(catchError(() => of(null))),
            this.teamService.getById(m.uuidTeamAway).pipe(catchError(() => of(null))),
          ]);

          return forkJoin(teamObservables).pipe(
            map((teamResults) => {
              return matches.map((m, index) => {
                const homeTeam = teamResults[index * 2];
                const awayTeam = teamResults[index * 2 + 1];
                const baseUrl = '';

                return {
                  ...m,
                  teamHomeLogo: homeTeam ? baseUrl + homeTeam.logo : 'assets/default-logo.png',
                  teamAwayLogo: awayTeam ? baseUrl + awayTeam.logo : 'assets/default-logo.png',
                };
              });
            })
          );
        })
      )
      .subscribe((matchesWithLogos) => {
        this.matches = matchesWithLogos;
        this.filteredMatches = matchesWithLogos;
      });
  }

  loadTeam(): void {}

  get hasPlayers(): boolean {
    return this.matches && this.matches.length > 0;
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  selectMatch(match: MatchReadDto) {
    this.selectedMatch = match;
    this.loadMatchPlayers(match.uuid);
  }

  loadMatchPlayers(uuidMatch: string) {
    this.matchPlayerService
      .getByMatch(uuidMatch)
      .subscribe((players) => (this.matchPlayers = players));
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();

    if (!term) {
      this.filteredMatches = this.matches;
      return;
    }

    this.filteredMatches = this.matches.filter(
      (match) =>
        (match.teamHomeName && match.teamHomeName.toLowerCase().includes(term)) ||
        (match.teamAwayName !== undefined && match.teamAwayName.toLowerCase().includes(term))
    );
  }

  create() {
    this.router.navigate(['/match/create']);
  }

  edit(uuid: string): void {
    this.router.navigate(['/match/update', uuid]);
  }

  delete(uuid: string): void {
    if (confirm('¿Seguro de eliminar este equipo?')) {
      this.matchService.delete(uuid).subscribe(() => this.loadMatches());
    }
  }
}
