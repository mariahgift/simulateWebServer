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

  getContacts(): void {
    this.contactService.getContacts()
    .subscribe(contacts => this.contacts = contacts);
  }

  delete(contact: Contact): void {
    this.contacts = this.contacts.filter(c => c !== contact);
    this.contactService.deleteContact(contact.id).subscribe();
  }

}
