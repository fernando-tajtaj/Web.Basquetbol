import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Global } from '../global';
import { PlayerReadDto } from '../../models/dto/player/player-read-dto';
import { PlayerCreateDto } from '../../models/dto/player/player-create-dto';
import { PlayerUpdateDto } from '../../models/dto/player/player-update-dto';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url + '/player';
  }

  getAll(): Observable<PlayerReadDto[]> {
    return this.http.get<PlayerReadDto[]>(this.url);
  }

  getByTeam(teamUuid: string): Observable<PlayerReadDto[]> {
    return this.http.get<PlayerReadDto[]>(`${this.url}/by-team/${teamUuid}`).pipe(
      catchError((err) => {
        console.warn('No se pudieron cargar los jugadores para el equipo seleccionado.', err);
        return of([]);
      })
    );
  }

  getById(uuid: string): Observable<PlayerReadDto> {
    return this.http.get<PlayerReadDto>(`${this.url}/${uuid}`);
  }

  create(player: PlayerCreateDto): Observable<PlayerReadDto> {
    return this.http.post<PlayerReadDto>(this.url, player);
  }

  update(uuid: string, player: PlayerUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${uuid}`, player);
  }

  delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${uuid}`);
  }
}
