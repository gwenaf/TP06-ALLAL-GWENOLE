import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.message = 'Login successful!';
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          this.message = 'Invalid username or password';
        } else {
          this.message = 'An error occurred';
        }
      }
    });
  }
}
