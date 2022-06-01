import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MovieModel } from 'netflix-malet-types';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private getAllMoviesURL = `${environment.apiEndpoint}/movies/all`;

  constructor(private http: HttpClient) {}

  getAllMovies() {
    return this.http
      .get<MovieModel[]>(this.getAllMoviesURL, {
        withCredentials: true,
      })
      .pipe(map((val) => val));
  }
}
