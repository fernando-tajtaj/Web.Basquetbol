import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBasketball, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserCreateDto } from '../../../models/dto/user/user-create-dto';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  faBasketball = faBasketball;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  form: FormGroup;
  alertMessage = '';
  alertType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alertType = 'error';
      this.form.markAllAsTouched();

      const controls = this.form.controls;

      if (controls['firstName'].hasError('required')) {
        this.alertMessage = 'Por favor, completa el campo nombre.';
      } else if (controls['lastName'].hasError('required')) {
        this.alertMessage = 'Por favor, completa el campo apellido.';
      } else if (controls['userName'].hasError('required')) {
        this.alertMessage = 'Por favor, completa el campo usuario.';
      } else if (controls['password'].hasError('required')) {
        this.alertMessage = 'Por favor, completa la contraseña.';
      } else if (controls['password'].hasError('minlength')) {
        this.alertMessage = 'La contraseña debe tener al menos 6 caracteres.';
      } else {
        this.alertMessage = 'Por favor, completa todos los campos correctamente.';
      }

      return;
    }

    const userCreateDto: UserCreateDto = this.form.value;

    this.userService.create(userCreateDto).subscribe({
      next: () => {
        this.alertMessage = 'Usuario creado correctamente.';
        this.alertType = 'success';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.alertMessage = 'Error al registrar el usuario.';
        this.alertType = 'error';
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
