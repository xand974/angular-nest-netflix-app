import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BrowseCardInterface } from 'src/types/browse.types';
import { ProfileModel } from 'netflix-malet-types';

@Component({
  selector: 'app-browse-card',
  templateUrl: './browse-card.component.html',
  styleUrls: ['./browse-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseCardComponent implements OnInit {
  @Input() userCard = {} as ProfileModel;
  @Output() onSelectUser: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  public selectUser(id: string) {
    this.onSelectUser.emit(id);
  }
}
