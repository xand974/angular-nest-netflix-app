import { Component, Input, OnInit } from '@angular/core';
import { MovieModel } from 'netflix-malet-types';

@Component({
  selector: 'malet-infos-movie',
  templateUrl: './infos-movie.component.html',
  styleUrls: ['./infos-movie.component.scss'],
})
export class InfosMovieComponent implements OnInit {
  @Input() movie = {} as MovieModel;
  constructor() {}

  ngOnInit(): void {}
}
