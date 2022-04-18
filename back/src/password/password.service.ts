import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PasswordService {
  public async genPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public async verifyPassword(password: string, encrypted: string) {
    return (await bcrypt.compare(password, encrypted)) as boolean;
  }
}
