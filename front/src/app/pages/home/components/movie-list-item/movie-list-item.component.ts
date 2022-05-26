import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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
  constructor(private router: Router) {
    this.loading = false;
    this.movie = {} as MovieModel;
    this.fromSearch = false;
  }

  ngOnInit(): void {}

  goToWatch(id: string) {
    if (!id || id.length === 0) return;
    this.router.navigate([`/watch/${id}`]);
  }
}
