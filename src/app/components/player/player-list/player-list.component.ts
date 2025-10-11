import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../../../services/player/player.service';
import { PlayerReadDto } from '../../../models/dto/player/player-read-dto';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBoxOpen, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player-list',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css',
})
export class PlayerListComponent {
  faBoxOpen = faBoxOpen;
  faPencil = faPencil;
  faTrash = faTrash;
  searchTerm: string = '';
  players: PlayerReadDto[] = [];
  filteredPlayers: PlayerReadDto[] = [];

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getAll().subscribe((data) => {
      this.players = data;
      this.filteredPlayers = data;
    });
  }

  get hasPlayers(): boolean {
    return this.players && this.players.length > 0;
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredPlayers = this.players.filter(
      (player) =>
        (player.fullName && player.fullName.toLowerCase().includes(term)) ||
        (player.number !== undefined && player.number.toString().includes(term)) ||
        (player.teamName && player.teamName.toLowerCase().includes(term)) ||
        (player.position && player.position.description.toLowerCase().includes(term))
    );
  }

  create(): void {
    this.router.navigate(['/player/create']);
  }

  edit(uuid: string): void {
    this.router.navigate(['/player/update', uuid]);
  }

  delete(uuid: string): void {
    if (confirm('¿Seguro de eliminar este equipo?')) {
      this.playerService.delete(uuid).subscribe(() => this.loadPlayers());
    }
  }
}
