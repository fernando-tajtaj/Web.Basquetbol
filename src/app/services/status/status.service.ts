import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { StatusReadDto } from '../../models/dto/status/status-read-dto';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url + '/status';
  }

  getAll(): Observable<StatusReadDto[]> {
    return this.http.get<StatusReadDto[]>(this.url);
  }
}
