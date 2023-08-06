import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contacts } from '../../interfaces/contacts';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {
  contacts: Contacts[] = [];
  newContact: Contacts = { id: 0, contactName: '', contactNumber: '' };
  editingContact: Contacts | null = null;
  searchName: string = '';
  searchResults: Contacts[] = [];

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contacts = this.contactsService.getAllContacts();
    this.searchResults = this.contacts;
  }

  addContact(): void {
    if (this.newContact.contactName && this.newContact.contactNumber) {
      this.newContact.id = this.contacts.length + 1;
      this.contactsService.addContact(this.newContact);
      this.newContact = { id: 0, contactName: '', contactNumber: '' };
      this.searchResults = this.contactsService.getAllContacts();
    }
  }

  deleteContact(id: number): void {
    this.contactsService.deleteContact(id);
    this.searchResults = this.contactsService.getAllContacts();
  }

  editContact(contact: Contacts): void {
    this.editingContact = { ...contact };
  }

  updateContact(updatedContact: Contacts): void {
    if (this.editingContact) {
      this.contactsService.updateContact(updatedContact);
      this.editingContact = null;
      this.searchResults = this.contactsService.getAllContacts();
    }
  }

  cancelEdit(): void {
    this.editingContact = null;
  }

  searchContacts(): void {
    if (this.searchName.trim() === '') {
      this.searchResults = this.contacts;
    } else {
      this.searchResults = this.contacts.filter(
        contact =>
          contact.contactName.toLowerCase().includes(this.searchName.toLowerCase()) ||
          contact.contactNumber.includes(this.searchName)
      );
    }
  }
}
