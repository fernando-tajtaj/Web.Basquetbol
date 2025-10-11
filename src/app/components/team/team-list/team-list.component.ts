import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Global } from '../../../services/global';
import { TeamReadDto } from '../../../models/dto/team/team-read-dto';
import { TeamService } from '../../../services/team/team.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBoxOpen, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-team-list',
  imports: [CommonModule, FontAwesomeModule, NgFor, NgIf, FormsModule],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css',
})
export class TeamListComponent implements OnInit {
  private url: string;
  faBoxOpen = faBoxOpen;
  faPencil = faPencil;
  faTrash = faTrash;
  teams: TeamReadDto[] = [];
  filteredTeams: TeamReadDto[] = [];
  searchTerm: string = '';

  constructor(private teamService: TeamService, private router: Router) {}

  ngOnInit(): void {
    this.url = Global.url;
    this.loadTeams();
  }

  get hasTeams(): boolean {
    return this.teams && this.teams.length > 0;
  }

  getLogoUrl(filename: string): string {
    return `http://localhost:5000${filename}`;
  }

  loadTeams(): void {
    this.teamService.getAll().subscribe({
      next: (data) => {
        this.teams = data;
        this.filteredTeams = data;
      },
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredTeams = this.teams.filter(
      (t) =>
        t.name.toLowerCase().includes(term) || (t.city?.name.toLowerCase().includes(term) ?? false)
    );
  }

  create(): void {
    this.router.navigate(['/team/create']);
  }

  edit(uuid: string): void {
    this.router.navigate(['/team/update', uuid]);
  }

  delete(uuid: string): void {
    if (confirm('¿Seguro de eliminar este equipo?')) {
      this.teamService.delete(uuid).subscribe(() => this.loadTeams());
    }
  }
}
