import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel } from 'netflix-malet-types';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private getUserByIdURL = `${environment.apiEndpoint}/users/get-user`;
  private favoritesURL = `${environment.apiEndpoint}/user-infos/favorites`;

  constructor(private http: HttpClient) {}

  /**
   * get user by id
   * @param {string} id
   * @returns {UserModel}
   */
  getUserById(id: string): Promise<UserModel> {
    return lastValueFrom(
      this.http.get<UserModel>(`${this.getUserByIdURL}/${id}`, {
        withCredentials: true,
      })
    );
  }

  /**
   * add or remove to favorites
   * @param {string} userId
   * @param {string} movieId
   * @returns
   */
  favorites(userId: string, movieId: string): Promise<UserModel> {
    return lastValueFrom(
      this.http.post<UserModel>(
        this.favoritesURL,
        { userId, movieId },
        { withCredentials: true }
      )
    );
  }
}
