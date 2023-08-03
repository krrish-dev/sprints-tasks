import { Component } from '@angular/core';
import { Contacts } from '../../interface/contacts';
@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.scss']
})
export class MainlayoutComponent {
  contactsData: Contacts[] = [
    { contactName: 'John Doe', contactNumber: '123-456-7890' },
    { contactName: 'Jane Smith', contactNumber: '987-654-3210' },
    // ... (other contact data)
  ];
}
