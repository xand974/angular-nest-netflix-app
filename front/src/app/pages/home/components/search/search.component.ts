import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'malet-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
