import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:4000/todos'; // Update with your API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.authService.getAuthHeaders() });
  }

  createTodo(todo: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, todo, { headers: this.authService.getAuthHeaders() });
  }

  updateTodo(todoId: number, updates: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${todoId}`, updates, { headers: this.authService.getAuthHeaders() });
  }

  deleteTodo(todoId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${todoId}`, { headers: this.authService.getAuthHeaders() });
  }
}
