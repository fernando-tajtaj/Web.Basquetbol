import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { MatchPlayerReadDto } from '../../models/dto/match-player/match-player-read-dto';
import { MatchPlayerCreateDto } from '../../models/dto/match-player/match-player-create-dto';
import { MatchPlayerUpdateDto } from '../../models/dto/match-player/match-player-update-dto';

@Injectable({
  providedIn: 'root',
})
export class MatchPlayerService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url + '/matchplayer';
  }

  getByMatch(uuidMatch: string): Observable<MatchPlayerReadDto[]> {
    return this.http.get<MatchPlayerReadDto[]>(`${this.url}/bymatch/${uuidMatch}`);
  }

  create(player: MatchPlayerReadDto): Observable<MatchPlayerReadDto> {
    return this.http.post<MatchPlayerReadDto>(this.url, player);
  }

  createBulk(players: MatchPlayerCreateDto[]): Observable<any> {
    return this.http.post<any>(`${this.url}/bulk`, players);
  }

  update(uuid: string, player: MatchPlayerReadDto): Observable<MatchPlayerReadDto> {
    return this.http.put<MatchPlayerReadDto>(`${this.url}/${uuid}`, player);
  }

  delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${uuid}`);
  }
}
