import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProfileModel } from 'netflix-malet-types';
import { map, lastValueFrom, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  private getProfileUrl = `${environment.apiEndpoint}/profiles/all-from-user`;
  private addProfileUrl = `${environment.apiEndpoint}/profiles/create`;
  private updateProfileUrl = `${environment.apiEndpoint}/profiles/update`;
  private removeProfileUrl = `${environment.apiEndpoint}/profiles/delete`;

  profiles$: BehaviorSubject<ProfileModel[]>;

  constructor(private http: HttpClient) {
    this.profiles$ = new BehaviorSubject<ProfileModel[]>([]);
  }

  public getAllProfilesByUser(id: string): Promise<ProfileModel[]> {
    return lastValueFrom(
      this.http
        .get<ProfileModel[]>(`${this.getProfileUrl}/${id}`, {
          withCredentials: true,
        })
        .pipe(
          map((val) => {
            this.profiles$.next(val);
            return val;
          })
        )
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

  public updateProfile(profileId: string, profile: Partial<ProfileModel>) {
    return lastValueFrom(
      this.http.patch(
        `${this.updateProfileUrl}/${profileId}`,
        { ...profile },
        { withCredentials: true }
      )
    );
  }

  public removeProfile(profileId: string) {
    return lastValueFrom(
      this.http.delete(`${this.removeProfileUrl}/${profileId}`, {
        withCredentials: true,
      })
    );
  }
}
