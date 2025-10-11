import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { MatchReadDto } from '../../models/dto/match/match-read-dto';
import { MatchCreateDto } from '../../models/dto/match/match-create-dto';
import { MatchUpdateDto } from '../../models/dto/match/match-update-dto';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url + '/match';
  }

  getAll(): Observable<MatchReadDto[]> {
    return this.http.get<MatchReadDto[]>(this.url);
  }

  getById(uuid: string): Observable<MatchReadDto> {
    return this.http.get<MatchReadDto>(`${this.url}/${uuid}`);
  }

  create(match: MatchCreateDto): Observable<MatchReadDto> {
    console.log(match);
    return this.http.post<MatchReadDto>(this.url, match);
  }

  update(uuid: string, match: MatchUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${uuid}`, match);
  }

  delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${uuid}`);
  }
}
