import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
//import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { SingleContactComponent } from './single-contact/single-contact.component';


@NgModule({
  declarations: [
    ContactsComponent,
 //   AllContactsComponent,
    SingleContactComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
