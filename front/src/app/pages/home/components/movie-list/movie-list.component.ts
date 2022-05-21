import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ListModel, MovieModel } from 'netflix-malet-types';
import { Observable, lastValueFrom } from 'rxjs';
import { HomeService } from '../../home.service';
import { MovieListStore } from './movie-list.store';
@Component({
  selector: 'malet-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MovieListStore],
})
export class MovieListComponent implements OnInit {
  @ViewChild('listElement') listElement = {} as ElementRef<HTMLDivElement>;
  @Input() list: ListModel;
  movies$: Observable<MovieModel[]>;

  public hideLeftButton: boolean = true;
  private slideIndex: number = 0;

  public hideButton: boolean = false;
  constructor(
    private homeService: HomeService,
    private cStore: MovieListStore
  ) {
    this.list = {} as ListModel;
    this.movies$ = this.cStore.movies$;
  }

  trackBy(index: number, value: ListModel) {
    return value._id;
  }
  ngOnInit(): void {
    this.getMovies();
  }

  async slideTo(direction: 'left' | 'right') {
    if (!this.listElement) return;
    const list = await lastValueFrom(this.movies$);
    const cardWidth = 20;
    const numberOfCardDisplayed = 4;
    const container = this.listElement.nativeElement;
    const size = list.length - numberOfCardDisplayed;
    const marginRight = 20;

    if (direction === 'left') {
      this.slideIndex = this.slideIndex > 0 ? this.slideIndex - 1 : size;
      container.style.transform = this.slide(cardWidth, marginRight, direction);
    }
    if (direction === 'right') {
      this.slideIndex = this.slideIndex === size ? 0 : this.slideIndex + 1;
      container.style.transform = this.slide(
        -cardWidth,
        marginRight,
        direction
      );
    }
  }

  /**
   * slide based on the direction
   * @param {number} cardWidth
   * @param {number} slideIndex
   * @param {number} marginRight
   * @param  {number}direction
   * @returns {string}
   */
  private slide(
    cardWidth: number,

    marginRight: number,
    direction: string
  ): string {
    return `translateX(calc(${direction === 'left' ? '-' : ''}${
      cardWidth * this.slideIndex
    }vw - ${marginRight * this.slideIndex}px ))`;
  }

  getMovies() {
    try {
      this.cStore.setLoading(true);
      this.cStore.setMovies(this.homeService.getMovies(this.list.movieIds));
    } catch (err) {
      this.cStore.setLoading(false);
      this.cStore.setError(true);
    }
  }
}
