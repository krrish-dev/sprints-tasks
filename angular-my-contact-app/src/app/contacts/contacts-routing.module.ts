// src/app/contacts/contacts-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllContactsComponent } from './all-contacts/all-contacts.component';

const routes: Routes = [
  { path: '', component: AllContactsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
