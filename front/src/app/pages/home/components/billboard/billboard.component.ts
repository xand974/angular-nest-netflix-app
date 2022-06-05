import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BillboardStore } from './billboard.store';
import { HomeService } from '../../home.service';
import { Observable, take, firstValueFrom } from 'rxjs';
import { MovieModel } from 'netflix-malet-types';
import { NbDialogService } from '@nebular/theme';
import { PreviewComponent } from '../../../../@core/modals/preview/preview.component';

@Component({
  selector: 'malet-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BillboardStore],
})
export class BillboardComponent implements OnInit {
  movie$: Observable<MovieModel | null>;
  constructor(
    private cStore: BillboardStore,
    private homeService: HomeService,
    private dialogService: NbDialogService
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

  public async openInfosPreviewModal() {
    const movie = await firstValueFrom(this.movie$.pipe(take(1)));
    if (!movie) return;
    this.dialogService.open(PreviewComponent, {
      context: {
        movie: movie,
      },
    });
  }
}
