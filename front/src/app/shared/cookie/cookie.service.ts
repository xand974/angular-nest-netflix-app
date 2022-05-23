import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  /**
   * get user by id
   * @param {string} id
   * @returns {UserModel}
   */
  getUserInLocalStorage() {
    const storage = localStorage.getItem('user-profile') ?? '';
    if (storage.length === 0) {
      return undefined;
    }
    return JSON.parse(storage);
  }
}
