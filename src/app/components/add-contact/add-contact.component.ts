import { Component } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contactService/contact.service';
import { MessageService } from 'src/app/services/messageService/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService, 
    private messageService: MessageService,
    private location: Location) {}

    public successMessage: string | undefined;
  addContact(contactName: string, contactNumber: string): void {
    contactName = contactName.trim();
    contactNumber = contactNumber.trim();
    if (!contactName) { return; }
    this.contactService.addContact({ contactName, contactNumber } as Contact)
      .subscribe(contact => {
        this.contacts.push(contact);
      });
      this.successMessage = "New contact successfully added!";
  }

  goBack(): void {
    this.location.back();
  }
}
