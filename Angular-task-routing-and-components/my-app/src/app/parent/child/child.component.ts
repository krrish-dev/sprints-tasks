// child.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  @Input() messageFromParent!: string;
  @Output() childEvent = new EventEmitter<string>();

  sendMessageToParent() {
    this.childEvent.emit('Message from child');
  }
}
