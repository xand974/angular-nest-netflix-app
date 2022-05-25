import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProfileModel, UserModel } from 'netflix-malet-types';
import { map, Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  private getProfileUrl = `${environment.apiEndpoint}/profiles/all-from-user`;
  private addProfileUrl = `${environment.apiEndpoint}/profiles/create`;

  constructor(private http: HttpClient) {}

  public getAllProfilesByUser(id: string): Promise<ProfileModel[]> {
    return lastValueFrom(
      this.http
        .get<ProfileModel[]>(`${this.getProfileUrl}/${id}`, {
          withCredentials: true,
        })
        .pipe(map((val) => val))
    );
  }

  public addProfile(profile: Partial<ProfileModel>, userId: string) {
    return lastValueFrom(
      this.http
        .post<{ profile: ProfileModel; data: string }>(
          this.addProfileUrl,
          { profile, userId },
          {
            withCredentials: true,
          }
        )
        .pipe(map((val) => val))
    );
  }
}
