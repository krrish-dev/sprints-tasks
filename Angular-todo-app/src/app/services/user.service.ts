// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private baseUrl = 'http://localhost:4000';

//   constructor(private http: HttpClient) {}

//   // Fetch users from the backend API
//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/users`);
//   }

//   // Fetch a specific user by username
//   getUserByUsername(username: string): Observable<any> {
//     return this.http.get<any>(`${this.baseUrl}/users/${username}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  // Fetch users from the backend API
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  // Fetch todos for a specific user
  getUserTodos(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/todos`);
  }
}

