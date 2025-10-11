import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { UserCreateDto } from '../../models/dto/user/user-create-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url + '/auth/register';
  }

  create(user: UserCreateDto): Observable<any> {
    return this.http.post<any>(this.url, user);
  }
}
