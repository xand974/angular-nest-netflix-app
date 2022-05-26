import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'malet-navbar-layout',
  templateUrl: './navbar-layout.component.html',
  styleUrls: ['./navbar-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
