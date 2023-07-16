import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  @Input() message!: string; // Non-null assertion

  @Output() childEvent = new EventEmitter<string>();

  sendMessage() {
    this.childEvent.emit('Message from child');
  }
}

