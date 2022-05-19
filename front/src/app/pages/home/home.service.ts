import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListModel, MovieModel } from 'netflix-malet-types';
import { catchError, lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomeStore } from './home.store';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private getListsUrl = environment.apiEndpoint + '/lists/random';
  private getMoviesUrl = environment.apiEndpoint + '/movies/get-movies-in-list';
  constructor(private http: HttpClient) {}

  public getLists() {
    let params = new HttpParams().set('size', 3);

    return this.http
      .get<ListModel[]>(this.getListsUrl, {
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

  public getMovies(ids: string[]) {
    return this.http
      .post<MovieModel[]>(
        `${this.getMoviesUrl}`,
        { ids },
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((val) => val),
        catchError((err) => {
          throw err;
        })
      );
  }
}
