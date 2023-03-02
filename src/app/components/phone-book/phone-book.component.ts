import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contactService/contact.service';
import { MessageService } from 'src/app/services/messageService/message.service';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.scss']
})
export class PhoneBookComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService, 
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  // onSelect(contact: Contact): void {
  //   this.selectedContact = contact;
  //   this.messageService.addContact(`PhoneBookComponent: Selected contact id = ${contact.id}`)
  // }

  getContacts(): void {
    this.contactService.getContacts()
    .subscribe(contacts => this.contacts = contacts);
  }

  addContact(contactName: string, contactNumber: string): void {
    contactName = contactName.trim();
    contactNumber = contactNumber.trim();
    if (!contactName) { return; }
    this.contactService.addContact({ contactName, contactNumber } as Contact)
      .subscribe(contact => {
        this.contacts.push(contact);
      });
  }

  delete(contact: Contact): void {
    this.contacts = this.contacts.filter(c => c !== contact);
    this.contactService.deleteContact(contact.id).subscribe();
  }

}
