import { Component, Input, OnInit } from '@angular/core';
import { ProfileModel } from 'netflix-malet-types';

@Component({
  selector: 'malet-manage-profiles',
  templateUrl: './manage-profiles.component.html',
  styleUrls: ['./manage-profiles.component.scss'],
})
export class ManageProfilesComponent implements OnInit {
  @Input() profiles: ProfileModel[];
  constructor() {
    this.profiles = [];
  }

  ngOnInit(): void {}
}