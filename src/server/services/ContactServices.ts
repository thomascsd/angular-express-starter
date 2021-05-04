import { DataService } from '@thomascsd/stools';
import { Service } from 'typedi';
import { Contact } from '../../shared/models';

const BASE_ID = 'appLdD9UKehdDawCn';

@Service()
export class ContactService {
  constructor(private db: DataService) {}

  async getContacts(): Promise<Contact[]> {
    return await this.db.getDatas<Contact>(BASE_ID, 'contact');
  }

  async saveContact(contact: Contact) {
    await this.db.saveData<Contact>(BASE_ID, 'contact', contact);
    return 'ok';
  }

  async updateContact(contact: Contact) {
    await this.db.updateData<Contact>(BASE_ID, 'contact', contact);
    return 'ok';
  }
}
