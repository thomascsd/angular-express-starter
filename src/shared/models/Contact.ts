import { IsNotEmpty, IsEmail, IsMobilePhone } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';

export class Contact {
  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsMobilePhone('zh-TW')
  mobile: string;
}
