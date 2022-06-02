import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'malet-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  constructor(private ref: NbDialogRef<PreviewComponent>) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close();
  }
}
