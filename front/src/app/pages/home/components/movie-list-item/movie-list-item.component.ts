import { Component, Input, OnInit } from '@angular/core';
import { MovieModel } from 'netflix-malet-types';
import { Router } from '@angular/router';

@Component({
  selector: 'malet-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss'],
})
export class MovieListItemComponent implements OnInit {
  @Input() movie;
  constructor(private router: Router) {
    this.movie = {} as MovieModel;
  }

  ngOnInit(): void {}

  goToWatch(id: string) {
    if (!id || id.length === 0) return;
    this.router.navigate([`/watch/${id}`]);
  }
}
