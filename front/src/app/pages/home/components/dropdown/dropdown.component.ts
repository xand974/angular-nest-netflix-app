import { DropdownItem } from 'src/types/dropdown.types';
import { Router } from '@angular/router';
import { LoginService } from '../../../login/login.service';
import { map } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'malet-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}
  @Input() imgURL: string =
    'https://www.cityguide-dubai.com/fileadmin/_processed_/3/3/csm_img-worlds-of-adventures-teaser_40e4184da1.jpg';

  public usersDropdown: DropdownItem[] = [
    {
      tag: 'goToAccount',
      bgImage: this.imgURL,
      text: 'User 1',
    },
    {
      tag: 'goToAccount',
      bgImage: this.imgURL,
      text: 'User 2',
    },
  ];
  public settingsDropdown: DropdownItem[] = [
    {
      tag: 'helpCenter',
      icon: 'question-mark-circle-outline',
      text: 'Help Center',
    },
    {
      tag: 'account',
      icon: 'person-outline',
      text: 'Account',
    },
    {
      tag: 'logOut',
      icon: 'log-out-outline',
      text: 'Log out',
    },
  ];

  ngOnInit(): void {}

  public handleDropdownSettings(tag: string): void {
    switch (tag) {
      case 'helpCenter':
        this.router.navigate(['/help']);
        return;
      case 'account':
        this.router.navigate(['/global-account']);
        return;
      case 'logOut':
        this.logout();
        return;
    }
  }

  public goToAccount(id: string): void {
    this.router.navigate([`/account/${id}`]);
  }

  public async logout() {
    const res = await this.loginService.logout();
    if (res.data && res.data === 'success') {
      this.router.navigate(['/login']);
    }
  }
}
