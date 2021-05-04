import { IsNotEmpty, IsEmail, IsMobilePhone } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';
import { BaseModel } from '@thomascsd/stools';

export class Contact extends BaseModel {
  constructor(data?: any) {
    super();
    plainToClassFromExist(this, data);
  }

  @IsNotEmpty({
    message: '姓名為必需填寫',
  })
  name: string;

  @IsNotEmpty({
    message: 'Email為必需填寫',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: '手機為必需填寫',
  })
  @IsMobilePhone('zh-TW')
  mobile: string;
}
