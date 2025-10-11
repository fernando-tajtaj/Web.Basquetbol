import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBasketball,
  faSignOut,
  faHome,
  faTrophy,
  faUserShield,
  faUsers,
  faFileText,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  faSignOut = faSignOut;
  faHome = faHome;
  faTrophy = faTrophy;
  faUserShield = faUserShield;
  faUsers = faUsers;
  faBasketball = faBasketball;
  faFileText = faFileText;
  userName: string;
  role: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userName = this.authService.getUsername() ?? 'Usuario';
    this.role = this.authService.getRole() ?? null;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout() {
    this.authService.logout();
  }
}
