import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BillboardStore } from './billboard.store';
import { HomeService } from '../../home.service';
import { Observable } from 'rxjs';
import { MovieModel } from 'netflix-malet-types';

@Component({
  selector: 'malet-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.scss'],
  providers: [BillboardStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillboardComponent implements OnInit {
  movie$: Observable<MovieModel | null>;
  constructor(
    private cStore: BillboardStore,
    private homeService: HomeService
  ) {
    this.movie$ = this.cStore.movie$;
  }

  ngOnInit(): void {
    this.initBillboardMovie();
  }

  initBillboardMovie() {
    this.cStore.setLoading(true);
    try {
      this.cStore.setMovie(this.homeService.getRandomMovie());
      this.cStore.setLoading(false);
    } catch (err) {
      this.cStore.setLoading(false);
      this.cStore.setError(true);
    }
  }
}
