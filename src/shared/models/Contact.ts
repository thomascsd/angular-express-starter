import { IsNotEmpty, IsEmail, IsMobilePhone } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';

export class Contact {
  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }

  @IsNotEmpty({
    message: '姓名為必需填寫'
  })
  name: string;

  @IsNotEmpty({
    message: 'Email為必需填寫'
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: '手機為必需填寫'
  })
  @IsMobilePhone('zh-TW')
  mobile: string;
}
