import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ListModel } from 'netflix-malet-types';
@Component({
  selector: 'malet-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit, AfterViewInit {
  @ViewChild('list') list = {} as ElementRef<HTMLDivElement>;
  public hideLeftButton: boolean = true;
  private slideIndex: number = 0;

  public movieList: ListModel[] = [
    {
      id: '123',
      movieIds: ['1', '2'],
      name: 'list',
      genre: ['fantasy'],
      type: 'Series',
    },
    {
      id: '456',
      movieIds: ['1', '2'],
      name: 'list',
      genre: ['fantasy'],
      type: 'Series',
    },
    {
      id: '789',
      movieIds: ['1', '2'],
      name: 'list',
      genre: ['fantasy'],
      type: 'Series',
    },
    {
      id: '10',
      movieIds: ['1', '2'],
      name: 'list',
      genre: ['fantasy'],
      type: 'Series',
    },
    {
      id: '11',
      movieIds: ['1', '2'],
      name: 'list',
      genre: ['fantasy'],
      type: 'Series',
    },
    {
      id: '11',
      movieIds: ['1', '2'],
      name: 'list',
      genre: ['fantasy'],
      type: 'Series',
    },
    {
      id: '12',
      movieIds: ['1', '2'],
      name: 'list',
      genre: ['fantasy'],
      type: 'Series',
    },
    {
      id: '13',
      movieIds: ['1', '2'],
      name: 'list',
      genre: ['fantasy'],
      type: 'Series',
    },
    {
      id: '14',
      movieIds: ['1', '2'],
      name: 'list',
      genre: ['fantasy'],
      type: 'Series',
    },
  ];

  public hideButton: boolean = false;
  constructor() {}

  trackBy(index: number, value: ListModel) {
    return value.id;
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  goTo(direction: 'left' | 'right') {
    if (!this.list) return;
    const cardWidth = 20;
    const numberOfCardDisplayed = 4;
    const container = this.list.nativeElement;
    const size = this.movieList.length - numberOfCardDisplayed;
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
}
