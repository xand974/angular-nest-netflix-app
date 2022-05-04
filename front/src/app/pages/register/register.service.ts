import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignInInterface } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiRegisterUrl = `${environment.apiEndpoint}/auth/register`;

  constructor(private readonly http: HttpClient) {}

  signIn(credential: SignInInterface) {
    return this.http.post(this.apiRegisterUrl, credential);
  }
}
