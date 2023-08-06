import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactsService } from './services/contacts.service';

import { AppComponent } from './app.component';
import { ContactsModule } from './contacts/contacts.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module'; // Import your AppRoutingModule here

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule, // Remove RouterModule.forRoot([]) here
    ContactsModule,
    SharedModule,
    AppRoutingModule // Add your AppRoutingModule here
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
