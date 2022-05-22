import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProfileModel, UserModel } from 'netflix-malet-types';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  private getProfileUrl = `${environment.apiEndpoint}/profiles/all-from-user`;

  constructor(private http: HttpClient) {}

  public getAllProfilesByUser(id: string): Observable<ProfileModel[]> {
    return this.http
      .get<ProfileModel[]>(`${this.getProfileUrl}/${id}`, {
        withCredentials: true,
      })
      .pipe(map((val) => val));
  }
}
