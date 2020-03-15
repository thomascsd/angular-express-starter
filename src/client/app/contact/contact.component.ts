import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DynamicFormBuilder, DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { Contact } from '../../../shared/models/Contact';
import { ContactService } from './contact.service';

class ContactViewModel extends Contact {
  updateMode: boolean;

  constructor(contact: Contact) {
    super();
    this.id = contact.id;
    this.name = contact.name;
    this.mobile = contact.mobile;
    this.email = contact.email;
    this.updateMode = false;
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  loading = false;
  group: DynamicFormGroup<Contact>;
  displayedColumns: string[] = ['cmd', 'name', 'email', 'mobile'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<ContactViewModel>;

  constructor(private fb: DynamicFormBuilder, private contactService: ContactService) {}

  ngOnInit(): void {
    this.group = this.fb.group(Contact, {
      name: '',
      email: '',
      mobile: ''
    });

    this.getContacts();
  }

  getContacts() {
    this.loading = true;
    this.contactService
      .getContacts()
      .pipe(untilDestroyed(this))
      .subscribe((contacts: Contact[]) => {
        const viewModels: ContactViewModel[] = contacts.map(c => new ContactViewModel(c));
        this.dataSource = new MatTableDataSource(viewModels);
        this.dataSource.sort = this.sort;
        this.loading = false;
      });
  }

  save() {
    this.group.validate();
    if (this.group.valid) {
      this.loading = true;
      this.contactService.saveContact(this.group.object).subscribe(() => {
        this.getContacts();
      });
    }
  }

  update(contact: ContactViewModel) {
    delete contact.updateMode;
    this.loading = true;
    this.contactService.updateContact(contact).subscribe(() => {
      this.getContacts();
    });
  }

  changeMode(contact: ContactViewModel) {
    contact.updateMode = !contact.updateMode;
  }

  cancel(contact: ContactViewModel) {
    contact.updateMode = false;
  }

  ngOnDestroy(): void {}
}
