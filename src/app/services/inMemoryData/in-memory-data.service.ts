import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from 'src/app/interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  
  constructor() { }

  createDb() {
    const contacts = [
      {id: 1, contactName: 'Aya', contactNumber: '123'},
      {id: 2, contactName: 'Gift', contactNumber: '143'},
      {id: 3, contactName: 'Iya', contactNumber: '113'},
      {id: 4, contactName: 'Jera', contactNumber: '163'},
    ];
    return {contacts};
  }

  genId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1: 3;
  }
}
