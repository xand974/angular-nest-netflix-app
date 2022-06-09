import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MovieModel } from 'netflix-malet-types';

@Component({
  selector: 'malet-infos-hover',
  templateUrl: './infos-hover.component.html',
  styleUrls: ['./infos-hover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfosHoverComponent implements OnInit {
  @Input() movie: MovieModel;
  constructor() {
    this.movie = {} as MovieModel;
  }

  ngOnInit(): void {}
}
