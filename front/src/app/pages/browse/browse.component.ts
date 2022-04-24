import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowseCardInterface } from 'src/types/browse.types';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent implements OnInit {
  public userCards: BrowseCardInterface[] = [
    {
      id: 's',
      name: 'Doe',
      imgURL: 'none',
    },
    {
      id: 'd',
      name: 'John',
      imgURL: 'none',
    },
    {
      id: 'z',
      name: 'Cena',
      imgURL: 'none',
    },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public selectUser(id: string) {
    this.router.navigate([`/home`], { queryParams: { user: id } });
  }
}
