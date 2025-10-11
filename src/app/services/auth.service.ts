import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/dto/login/login';
import { LoginResponseDto } from '../models/dto/login/login-response-dto';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';
  private url: string;

  constructor(private router: Router, private http: HttpClient) {
    this.url = Global.url;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(loginResponseDto: Login): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(this.url + '/auth/login', loginResponseDto);
  }

  saveLoginData(loginResponseDto: LoginResponseDto): void {
    localStorage.setItem(this.tokenKey, loginResponseDto.token);
    localStorage.setItem(
      this.userKey,
      JSON.stringify({
        username: loginResponseDto.user?.username,
        role: loginResponseDto.user?.role,
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return this.getUser()?.username ?? null;
  }

  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }

  private getUser(): { username: string; role: string } | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }
}
