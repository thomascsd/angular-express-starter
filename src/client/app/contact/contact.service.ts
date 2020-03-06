import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private client: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.client.get<Contact[]>('/api/contact/list');
  }

  saveContact(contact: Contact) {
    return this.client.post('/api/contact/save', contact);
  }

  updateContact(contact: Contact) {
    return this.client.post('/api/contact/update', contact);
  }
}
