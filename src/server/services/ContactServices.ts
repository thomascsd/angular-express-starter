import { RestDbService } from './RestDbService';
import { Inject } from 'typedi';
import { Contact } from '../../shared/models/Contact';

@Inject()
export class ContactService {
  constructor(private db: RestDbService) {}

  async getContacts(): Promise<Contact[]> {
    return await this.db.getDatas<Contact>('contact');
  }

  async saveContact(contact: Contact) {
    await this.db.saveData<Contact>('contact', contact);
    return 'ok';
  }
}
