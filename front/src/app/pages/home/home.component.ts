import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { lastValueFrom, map, Observable, tap } from 'rxjs';
import { HomeService } from './home.service';
import { HomeStore } from './home.store';
import { ListModel } from 'netflix-malet-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  movies$: Observable<ListModel[]>;

  constructor(private homeService: HomeService, private homeStore: HomeStore) {
    this.loading$ = this.homeStore.loading$;
    this.error$ = this.homeStore.error$;
    this.movies$ = this.homeStore.movies$;
  }

  async ngOnInit() {
    this.initList();
  }

  async initList() {
    this.homeStore.setLoading(true);
    try {
      this.homeStore.setMovies(this.homeService.getMovies());
      this.homeStore.setLoading(false);
    } catch (err) {
      this.homeStore.setError(true);
      this.homeStore.setLoading(false);
    }
  }
}
