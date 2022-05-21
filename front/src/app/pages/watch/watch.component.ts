import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchStore } from './watch.store';
import { HomeService } from '../home/home.service';
import { MovieModel } from 'netflix-malet-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WatchStore],
})
export class WatchComponent implements OnInit {
  movie$: Observable<MovieModel | null>;
  public id: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cStore: WatchStore,
    private homeService: HomeService
  ) {
    this.id = '';
    this.movie$ = this.cStore.movie$;
  }

  ngOnInit(): void {
    this.initParam();
    this.initMovie();
  }

  initParam() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (!movieId || movieId === null) {
      this.router.navigate(['/home']);
      return;
    }
    this.id = movieId;
  }

  initMovie() {
    this.cStore.setLoading(true);
    try {
      this.cStore.setMovie(this.homeService.getMovieById(this.id));
      this.homeService.getMovieById(this.id).subscribe((val) => {
        console.log(val);
      });
      this.cStore.setLoading(false);
    } catch (err) {
      this.cStore.setLoading(false);
      this.cStore.setError(true);
    }
  }
}
