// src/app/contacts/contacts.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ContactsRoutingModule } from './contacts-routing.module';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AllContactsComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule
    ContactsRoutingModule,
    SharedModule
  ]
})
export class ContactsModule { }
