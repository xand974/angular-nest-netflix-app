import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogInInterface } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiLoginUrl = `${environment.apiEndpoint}/auth/login`;

  constructor(private readonly http: HttpClient) {}

  login(credential: LogInInterface) {
    try {
      return this.http.post(this.apiLoginUrl, credential);
    } catch (err) {
      throw new Error("impossible de s'inscrire, désolé");
    }
  }
}
