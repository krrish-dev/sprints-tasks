// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { Login } from '../../models/login.model';
// import { UserService } from '../../services/user.service';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   credentials: Login = { username: '', password: '' };
//   loginForm!: FormGroup;
//   users: any[] = [];
//   selectedUser: any = null;

//   constructor(
//     private authService: AuthService,
//     private fb: FormBuilder,
//     private userService: UserService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });

//     this.loadUsers();
//   }

//   loadUsers() {
//     this.userService.getUsers().subscribe(
//       (users: any[]) => {
//         this.users = users;
//       },
//       (error) => {
//         console.error('Error fetching users:', error);
//       }
//     );
//   }

//   async login() {
//     try {
//       const isAuthenticated = await this.authService.login(
//         this.loginForm.value.username,
//         this.loginForm.value.password
//       );

//       if (isAuthenticated) {
//         console.log('User logged in');
//         this.router.navigate(['/todos']);

//       } else {
//         alert('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('An error occurred during login. Please try again.');
//     }

//     this.loginForm.reset();
//   }

//   // Update the selected user when a username is selected
//   onUserSelect(username: string) {
//     this.selectedUser = this.users.find((user) => user.username === username);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: Login = { username: '', password: '' };
  loginForm!: FormGroup;
  users: any[] = [];
  selectedUser: any = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        this.users = users;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  async login() {
    try {
      const isAuthenticated = await this.authService.login(
        this.loginForm.value.username,
        this.loginForm.value.password
      );

      if (isAuthenticated) {
        console.log('User logged in');
        this.selectedUser = this.authService.currentUser;
        this.router.navigate(['/todos']);
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }

    this.loginForm.reset();
  }

  onUserSelect(username: string) {
    this.selectedUser = this.users.find((user) => user.username === username);
  }
}
