import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DynamicFormBuilder, DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { Contact } from '../../../shared/models/Contact';
import { ContactService } from './contact.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  group: DynamicFormGroup<Contact>;
  displayedColumns: string[] = ['name', 'email', 'mobile'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<Contact>;

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
    this.contactService
      .getContacts()
      .pipe(untilDestroyed(this))
      .subscribe((contacts: Contact[]) => {
        this.dataSource = new MatTableDataSource(contacts);
        this.dataSource.sort = this.sort;
      });
  }

  save() {
    if (this.group.valid) {
      this.contactService.saveContact(this.group.object).subscribe(() => {
        this.getContacts();
      });
    }
  }

  ngOnDestroy(): void {}
}
