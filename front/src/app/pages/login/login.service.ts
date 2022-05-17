import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogInInterface } from 'src/types';
import { lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { UserModel } from 'netflix-malet-types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiLoginUrl = `${environment.apiEndpoint}/auth/login`;
  private apiCheckAuthUrl = `${environment.apiEndpoint}/auth/check-auth`;
  private apiGetUserInfosUrl = `${environment.apiEndpoint}/user-infos/get`;
  private apiSetAuthUrl = `${environment.apiEndpoint}/auth/set-auth`;

  constructor(private readonly http: HttpClient) {}

  login(credential: LogInInterface) {
    return lastValueFrom(
      this.http
        .post<any>(this.apiLoginUrl, credential, {
          withCredentials: true,
        })
        .pipe(map(() => this.getUserProfile(credential.username)))
    );
  }

  getUserProfile(username: string): Promise<UserModel> {
    return lastValueFrom(
      this.http
        .get<UserModel>(`${this.apiGetUserInfosUrl}?u=${username}`, {
          withCredentials: true,
        })
        .pipe(map((res) => this.setToLocalStorage(res)))
    );
  }

  setToLocalStorage(user: UserModel) {
    localStorage.setItem('user-profile', JSON.stringify(user));
    return user;
  }

  checkAuth(): Promise<boolean> {
    return lastValueFrom(
      this.http.get(this.apiCheckAuthUrl).pipe(map((res) => res as boolean))
    );
  }

  setAuth() {
    return lastValueFrom(this.http.get(this.apiSetAuthUrl));
  }
}
