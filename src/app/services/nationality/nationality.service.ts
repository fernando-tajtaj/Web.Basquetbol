import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { NationalityReadDto } from '../../models/dto/nationality/nationality-read-dto';

@Injectable({
  providedIn: 'root',
})
export class NationalityService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url + '/nationality';
  }

  getAll(): Observable<NationalityReadDto[]> {
    return this.http.get<NationalityReadDto[]>(this.url);
  }
}
