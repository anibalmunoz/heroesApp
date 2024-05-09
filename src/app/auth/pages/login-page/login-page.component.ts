import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  constructor(private authService: AuthService, private route: Router) {}

  onLogin() {
    this.authService.login('correo', 'password').subscribe((user) => {
      if (user) this.route.navigateByUrl('/');
    });
  }
}
