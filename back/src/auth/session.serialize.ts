import { PassportSerializer } from '@nestjs/passport';
import { UserModel } from 'netflix-malet-types';

export class SessionSerializer extends PassportSerializer {
  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: UserModel, done: Function) {
    done(null, user);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  deserializeUser(payload: UserModel, done: Function) {
    done(null, payload);
  }
}
