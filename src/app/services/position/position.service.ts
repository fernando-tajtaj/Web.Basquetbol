import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { PositionReadDto } from '../../models/dto/position/position-read-dto';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url + '/position';
  }

  getAll(): Observable<PositionReadDto[]> {
    return this.http.get<PositionReadDto[]>(this.url);
  }
}
