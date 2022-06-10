import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'malet-preview-item',
  templateUrl: './preview-item.component.html',
  styleUrls: ['./preview-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
