import { Component, Input } from '@angular/core';
import { Contacts } from '../../interface/contacts';


@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent {
  @Input() contacts: Contacts[] = [];
 
  constructor() {}

  ngOnInit(): void {}
}

