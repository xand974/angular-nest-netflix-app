import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'malet-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @ViewChild('inputElement') inputElement = {} as ElementRef<HTMLInputElement>;
  public searchText: string;

  constructor() {
    this.searchText = '';
  }

  ngOnInit(): void {}

  search(e: MouseEvent) {
    e.preventDefault();
    this.handleToggle();
    if (this.searchText.length === 0) return;

    // TODO handle search text here
  }

  handleToggle() {
    this.inputElement.nativeElement.style.transform = 'scaleX(1)';
  }

  blur(e: FocusEvent) {
    if (this.searchText.length > 0) return;
    this.inputElement.nativeElement.style.transform = 'scaleX(0)';
  }
}
