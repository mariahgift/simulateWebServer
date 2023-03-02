import { Injectable } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { CONTACTS } from '../../mock-data/mock-contact';

import { Observable, of } from 'rxjs';
import { MessageService } from './../messageService/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsUrl = 'api/contacts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    ) { }

    private log(message: string) {
      this.messageService.addContact(`ContactService: $(message)`);
    }
  
  getContacts(): Observable<Contact[]> {
    const contacts = of(CONTACTS);
    this.messageService.addContact('ContactService: fetched contacts');
    return this.http.get<Contact[]>(this.contactsUrl)
    .pipe(catchError(this.handleError<Contact[]>('getContacts', [])));
  }

  getContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap(_ => this.log(`fetched contact id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

addContact(contact: Contact): Observable<Contact> {
  return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions).pipe(
    tap((newContact: Contact) => this.log(`added contact w/ id=${newContact.id}`)),
    catchError(this.handleError<Contact>('addContact'))
  );
}

  /** PUT: update the hero on the server */
  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      tap(_ => this.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;

    return this.http.delete<Contact>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Contact>('deleteContact'))
    );
  }
}
