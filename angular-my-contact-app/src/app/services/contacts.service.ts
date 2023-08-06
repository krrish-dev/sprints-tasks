// src/app/services/contacts.service.ts

import { Injectable } from '@angular/core';
import { Contacts } from '../interfaces/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts: Contacts[] = [];
  private nextId: number = 1; // To assign unique IDs to contacts

  getAllContacts(): Contacts[] {
    return this.contacts;
  }

  getContactById(id: number): Contacts | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  addContact(contact: Contacts): void {
    contact.id = this.nextId++; // Assign a unique ID
    this.contacts.push(contact);
  }

  updateContact(updatedContact: Contacts): void {
    const index = this.contacts.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
    }
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
  }
}
