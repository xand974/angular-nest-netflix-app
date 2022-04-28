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
  constructor() {}

  trackBy(index: number, value: ListModel) {
    return value.id;
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.list.nativeElement);
  }

  goTo(direction: 'left' | 'right') {
    if (!this.list) return;
    const cardWidth = 20;
    const numberOfCardDisplayed = 4;
    const container = this.list.nativeElement;
    const size = this.movieList.length - numberOfCardDisplayed;
    const { x } = container.getBoundingClientRect();

    if (direction === 'left' && this.slideIndex > 0) {
      this.slideIndex--;
      container.style.transform = `translateX(-${cardWidth + x}vw)`;
    }
    if (direction === 'right' && this.slideIndex < size) {
      this.slideIndex++;
      container.style.transform = `translateX(-${cardWidth + x}vw)`;
    }
  }
}
