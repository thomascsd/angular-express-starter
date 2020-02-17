import { Component, OnInit } from '@angular/core';
import { DynamicFormBuilder, DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { Contact } from '../../../shared/models/Contact';
import { ContactService } from './contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  group: DynamicFormGroup<Contact>;
  contacts$: Observable<Contact>;

  constructor(private fb: DynamicFormBuilder, private contactService: ContactService) {
    this.group = this.fb.group(Contact, {
      name: '',
      email: '',
      mobile: ''
    });
  }

  ngOnInit(): void {
    this.contacts$ = this.contactService.getContacts();
  }

  save() {
    if (this.group.valid) {
      this.contactService.saveContact(this.group.object);
    }
  }
}
