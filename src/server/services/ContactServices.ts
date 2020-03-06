import { RestDbService } from './RestDbService';
import { Inject } from 'typedi';
import { Contact } from '../../shared/models';

@Inject()
export class ContactService {
  constructor(private db: RestDbService) {}

  async getContacts(): Promise<Contact[]> {
    return await this.db.getDatas<Contact>('appLdD9UKehdDawCn', 'contact');
  }

  async saveContact(contact: Contact) {
    await this.db.saveData<Contact>('appLdD9UKehdDawCn', 'contact', contact);
    return 'ok';
  }
}
