import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/dto/login/login';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBasketball } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  form: FormGroup;
  error = '';

  faBasketball = faBasketball;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.showError('Datos no válidos.');
      return;
    }

    const login: Login = this.form.value;

    this.authService.login(login).subscribe({
      next: (res) => {
        this.authService.saveLoginData(res);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.showError('Credenciales inválidas.');
      },
    });
  }

  onToRegister() {
    this.router.navigate(['/register']);
  }

  private showError(message: string) {
    this.error = message;
    setTimeout(() => (this.error = ''), 5000);
  }
}
