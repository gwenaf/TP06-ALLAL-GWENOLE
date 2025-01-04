import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../service/user.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  message = '';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Vérifier si on est logué
    if (!this.authService.isLoggedIn()) {
      this.message = 'Please login first';
      return;
    }
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser().subscribe({
      next: (u) => {
        this.user = u;
      },
      error: (err) => {
        console.error(err);
        this.message = 'Could not load user data';
      }
    });
  }

  onSubmit() {
    if (!this.user) return;

    if (!this.user.email) {
      this.message = 'Email is required';
      return;
    }

    this.userService.updateUser({
      email: this.user.email,
      address: this.user.address,
      phone: this.user.phone
    }).subscribe({
      next: (updated) => {
        this.user = updated;
        this.message = 'User updated successfully!';
      },
      error: (err) => {
        console.error(err);
        this.message = 'Error updating user';
      }
    });
  }
}
