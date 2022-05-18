import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'malet-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() loading: boolean;
  constructor() {
    this.loading = false;
  }

  ngOnInit(): void {}
}
