import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contactService/contact.service';
import { Contact } from '../../interfaces/contact';
import { Location } from '@angular/common';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact | undefined;
  public successMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.contactService.getContact(id)
    .subscribe(contact => this.contact = contact);
  }

  goBack(): void {
  this.location.back();
}

save(): void {
  if (this.contact) {
    this.contactService.updateContact(this.contact)
      .subscribe(() => this.goBack());
      this.successMessage = "Contact details updated!";
  }
}
}
