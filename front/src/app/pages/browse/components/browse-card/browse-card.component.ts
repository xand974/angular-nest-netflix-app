import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowseCardInterface } from '../../../../types/browse.types';

@Component({
  selector: 'app-browse-card',
  templateUrl: './browse-card.component.html',
  styleUrls: ['./browse-card.component.scss'],
})
export class BrowseCardComponent implements OnInit {
  @Input() userCard = {} as BrowseCardInterface;
  @Output() onSelectUser: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  public selectUser(id: string) {
    this.onSelectUser.emit(id);
  }
}
