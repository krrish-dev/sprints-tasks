import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router module
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {} // Inject the Router service

  ngOnInit(): void {
    console.log('Header component initialized');

    // Check if the authentication service has currentUser data
    if (this.authService.currentUser) {
      console.log('Current user data available:', this.authService.currentUser);
      console.log('User name:', this.authService.currentUser.name);
      console.log('User avatar:', this.authService.currentUser.avatar);
    } else {
      console.log('No current user data available');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
