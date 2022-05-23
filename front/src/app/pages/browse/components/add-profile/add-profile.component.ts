import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
@Component({
  selector: 'malet-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent implements OnInit {
  constructor(private ref: NbDialogRef<AddProfileComponent>) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close();
  }
}
