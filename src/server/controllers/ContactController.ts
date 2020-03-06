import { JsonController, Get, Post, Body } from 'routing-controllers';
import { Inject } from 'typedi';
import { ContactService } from '../services/ContactServices';
import { Contact } from '../../shared/models/Contact';

@Inject()
@JsonController()
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('/contact/list')
  getContacts() {
    return this.contactService.getContacts();
  }

  @Post('/contact/save')
  saveContact(@Body() contact: Contact) {
    return this.contactService.saveContact(contact);
  }

  @Post('/contact/update')
  update(@Body() contact: Contact) {
    return this.contactService.updateContact(contact);
  }
}
