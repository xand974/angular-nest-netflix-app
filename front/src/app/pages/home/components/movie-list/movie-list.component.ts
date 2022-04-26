import { Component, OnInit } from '@angular/core';
import { ListModel } from 'netflix-malet-types';
@Component({
  selector: 'malet-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
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
}
