import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TodoService } from '../../services/todo.service'; // Make sure you import TodoService

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userTodos: any[] = [];
  newTask: string = '';

  constructor(private authService: AuthService, private todoService: TodoService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.userTodos = this.authService.userTodos; // Use userTodos from authService
    }
    // Fetch and display todos from the server
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getAllTodos().subscribe(
      (todos: any[]) => {
        this.userTodos = todos;
      },
      (error: any) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  createTodo() {
    const newTodo = { task: this.newTask, completed: false };
    this.todoService.createTodo(newTodo).subscribe(
      (createdTodo: any) => {
        this.userTodos.push(createdTodo);
        this.newTask = ''; // Clear the input
      },
      (error: any) => {
        console.error('Error creating todo:', error);
      }
    );
  }

  updateTodoStatus(todoId: number, newStatus: boolean) {
    const updates = { completed: newStatus };
    this.todoService.updateTodo(todoId, updates).subscribe(
      () => {
        const updatedTodo = this.userTodos.find(todo => todo.id === todoId);
        if (updatedTodo) {
          updatedTodo.completed = newStatus;
        }
      },
      (error: any) => {
        console.error('Error updating todo:', error);
      }
    );
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId).subscribe(
      () => {
        this.userTodos = this.userTodos.filter(todo => todo.id !== todoId);
      },
      (error: any) => {
        console.error('Error deleting todo:', error);
      }
    );
  }
}
