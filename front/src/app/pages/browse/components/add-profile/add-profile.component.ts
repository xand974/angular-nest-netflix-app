import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ProfileModel } from 'netflix-malet-types';
@Component({
  selector: 'malet-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent implements OnInit {
  public profileName: string;
  public img: string;
  constructor(private ref: NbDialogRef<AddProfileComponent>) {
    this.profileName = '';
    this.img = '/assets/images/default-user.png';
  }

  ngOnInit(): void {}

  public dismiss() {
    this.ref.close({ data: 'close' });
  }

  public create() {
    const profile = {
      name: this.profileName,
      photoURL: this.img,
    } as Partial<ProfileModel>;
    this.ref.close({ data: 'success', profile });
  }
}
