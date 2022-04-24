import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'malet-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
