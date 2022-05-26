import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieModel } from 'netflix-malet-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private getMoviesFromSearchURL = `${environment.apiEndpoint}/movies/search`;
  constructor(private http: HttpClient) {}

  getMoviesFromSearch(searchText: string) {
    const params = new HttpParams().set('q', searchText);
    return this.http.get<MovieModel[]>(this.getMoviesFromSearchURL, {
      params,
      withCredentials: true,
    });
  }
}
