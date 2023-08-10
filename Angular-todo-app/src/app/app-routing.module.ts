import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './auth/login/login.component'; // Import the LoginComponent
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  // Redirect to login if no user is logged in
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'todos', component: MainComponent , canActivate: [AuthGuard]},
  // Add the LoginComponent route
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
