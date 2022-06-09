import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MovieModel } from 'netflix-malet-types';
import { Router } from '@angular/router';

@Component({
  selector: 'malet-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListItemComponent implements OnInit {
  @Input() loading;
  @Input() movie;
  @Input() fromSearch: boolean;

  public showExpand: boolean;

  constructor(private router: Router) {
    this.loading = false;
    this.movie = {} as MovieModel;
    this.fromSearch = false;
    this.showExpand = false;
  }

  ngOnInit(): void {}

  goToWatch(id: string) {
    if (!id || id.length === 0) return;
    this.router.navigate([`/watch/${id}`]);
  }

  mouseIn() {
    this.showExpand = true;
  }
  mouseOut() {
    this.showExpand = false;
  }
}
