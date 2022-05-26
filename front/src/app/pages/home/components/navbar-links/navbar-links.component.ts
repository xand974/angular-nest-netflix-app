import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { LinkInterface } from 'src/types/index';

@Component({
  selector: 'malet-navbar-links',
  templateUrl: './navbar-links.component.html',
  styleUrls: ['./navbar-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarLinksComponent implements OnInit {
  @Input() currentProfileId: string | undefined;
  public links: LinkInterface[];

  constructor() {
    this.currentProfileId = '';
    this.links = [];
  }

  ngOnInit(): void {
    this.populateLinks();
  }

  private populateLinks() {
    this.links = [
      { name: 'Home', link: `/home?user=${this.currentProfileId}` },
      { name: 'TV Shows', link: '/tv-shows' },
      { name: 'Movies', link: '/movies' },
      { name: 'Latest', link: '/latest' },
      { name: 'My List', link: '/my-list' },
    ];
  }
}
