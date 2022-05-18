import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListModel } from 'netflix-malet-types';
import { catchError, lastValueFrom, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomeStore } from './home.store';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private getMoviesUrl = environment.apiEndpoint + '/lists/random';
  constructor(private http: HttpClient) {}

  public getMovies() {
    let params = new HttpParams().set('size', 3);

    return this.http
      .get<ListModel[]>(this.getMoviesUrl, {
        params,
        withCredentials: true,
      })
      .pipe(
        map((val) => val),
        catchError((err) => {
          throw err;
        })
      );
  }
}
