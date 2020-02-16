import { JsonController, Get, Post, Body } from 'routing-controllers';
import { Inject } from 'typedi';

@Inject()
@JsonController()
export class ContactController {
  constructor() {}

  @Get('contact')
  getContacts() {}
}
