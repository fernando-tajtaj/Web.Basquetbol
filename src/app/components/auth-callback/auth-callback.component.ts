import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css',
})
export class AuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];

      if (token) {
        console.log('Token recibido exitosamente');
        localStorage.setItem('token', token);

        // Redirigir al dashboard
        this.router.navigate(['/home']);
      } else {
        console.error('No se recibió token');
        this.router.navigate(['/login']);
      }
    });
  }
}
