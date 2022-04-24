import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LinkInterface } from 'src/types/navbar.types';

@Component({
  selector: 'malet-navbar-links',
  templateUrl: './navbar-links.component.html',
  styleUrls: ['./navbar-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarLinksComponent implements OnInit {
  public links: LinkInterface[] = [
    { name: 'Home', link: '/home' },
    { name: 'TV Shows', link: '/tv-shows' },
    { name: 'Movies', link: '/movies' },
    { name: 'Latest', link: '/latest' },
    { name: 'My List', link: '/my-list' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
