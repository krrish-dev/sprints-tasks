// parent.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  parentMessage = 'Message from parent';

  onChildEvent(event: string) {
    console.log('Event received in parent:', event);
  }
}
