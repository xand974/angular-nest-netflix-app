import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { MovieModel } from 'netflix-malet-types';
import { Router } from '@angular/router';
import { capitalize, formatGenres } from '../../../helpers/utils.helper';

@Component({
  selector: 'malet-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @Input() movie: MovieModel;
  public genre: string;

  constructor(
    private ref: NbDialogRef<PreviewComponent>,
    private router: Router
  ) {
    this.movie = {} as MovieModel;
    this.genre = '';
  }

  ngOnInit(): void {
    this.genre = formatGenres(this.movie.genre);
  }

  goToPlay(id: string) {
    if (!id || id === '') return;
    this.router.navigate([`/watch/${id}`]);
  }

  addToFavorite(id: string) {
    if (!id || id === '') return;
    // TODO add to favorite
  }

  dismiss() {
    this.ref.close();
  }
}
