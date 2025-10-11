import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { TeamReadDto } from '../../models/dto/team/team-read-dto';
import { TeamCreateDto } from '../../models/dto/team/team-create-dto';
import { TeamUpdateDto } from '../../models/dto/team/team-update-dto';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url + '/team';
  }

  getAll(): Observable<TeamReadDto[]> {
    return this.http.get<TeamReadDto[]>(this.url);
  }

  getById(uuid: string): Observable<TeamReadDto> {
    return this.http.get<TeamReadDto>(`${this.url}/${uuid}`);
  }

  create(team: TeamCreateDto): Observable<TeamReadDto> {
    return this.http.post<TeamReadDto>(this.url, team, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  update(uuid: string, team: TeamUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${uuid}`, team);
  }

  uploadLogo(file: File): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ path: string }>(`${this.url}/upload-logo`, formData);
  }

  delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${uuid}`);
  }
}
