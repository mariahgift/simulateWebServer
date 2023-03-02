import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { PhoneBookComponent } from './components/phone-book/phone-book.component';

const routes: Routes = [
  { path: 'addContact', component: AddContactComponent},
  { path: 'contacts', component: PhoneBookComponent},
  { path: 'detail/:id', component: ContactDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
