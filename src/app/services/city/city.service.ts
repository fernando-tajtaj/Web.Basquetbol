import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { CityReadDto } from '../../models/dto/city/city-read-dto';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url + '/city';
  }

  getAll(): Observable<CityReadDto[]> {
    return this.http.get<CityReadDto[]>(this.url);
  }
}
