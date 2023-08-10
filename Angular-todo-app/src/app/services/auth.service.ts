import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static isAuthenticatedUser() {
    throw new Error('Method not implemented.');
  }
  private isAuthenticated: boolean = false;
  private baseUrl = 'http://localhost:4000'; // Update with your API URL

  // Add properties to store user data and todos
  currentUser: any = {}; // Initialize with an empty object
  userTodos: any[] = [];

  // Store the authentication headers
  private authHeaders: HttpHeaders | undefined;

  constructor(private http: HttpClient , private router: Router) {}

  async login(username: string, password: string): Promise<boolean> {
    const encodedCredentials = btoa(`${username}:${password}`);
    this.authHeaders = new HttpHeaders({
      'Authorization': `Basic ${encodedCredentials}`
    });

    try {
      // Make an API request with Basic Authentication and convert to promise
      const response = await this.http.get<any[]>(`${this.baseUrl}/users`, { headers: this.authHeaders }).toPromise();

      console.log('Authenticated:', response);

      // Check if response is defined and not empty
      if (response && response.length > 0) {
        this.currentUser = response[0]; // Assign user data
        this.userTodos = response; // Assign todos
        this.isAuthenticated = true;
        return true;
      } else {
        console.error('Authentication failed: Invalid response');
        this.isAuthenticated = false;
        return false;
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      this.isAuthenticated = false;
      return false;
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.authHeaders = undefined;
    this.currentUser = {}; // Clear the currentUser data
  }

  // Method to get headers with authentication
  getAuthHeaders(): HttpHeaders {
    return this.authHeaders || new HttpHeaders();
  }
}
