import { RestDbService } from './RestDbService';
import { Inject } from 'typedi';

@Inject()
export class ContactService {
  constructor(private db: RestDbService) {}
  async getContacts() {}
}
