import { Component, Input, OnInit } from '@angular/core';
import { ProfileModel } from 'netflix-malet-types';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'malet-manage-profiles',
  templateUrl: './manage-profiles.component.html',
  styleUrls: ['./manage-profiles.component.scss'],
})
export class ManageProfilesComponent implements OnInit {
  @Input() profiles: ProfileModel[];
  constructor(private ref: NbDialogRef<ManageProfilesComponent>) {
    this.profiles = [];
  }

  ngOnInit(): void {}

  public dismiss() {
    this.ref.close({
      data: 'close',
    });
  }
}
