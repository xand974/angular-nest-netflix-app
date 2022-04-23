import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiRegisterUrl = `${environment.apiEndpoint}/auth/register`;
  private apiLoginUrl = `${environment.apiEndpoint}/auth/login`;

  constructor() {}
}
