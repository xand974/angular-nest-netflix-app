import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'malet-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @ViewChild('inputElement') inputElement = {} as ElementRef<HTMLInputElement>;
  public searchText: string;

  constructor(private router: Router) {
    this.searchText = '';
  }

  ngOnInit(): void {}

  search(e: MouseEvent) {
    e.preventDefault();
    this.handleToggle();
    if (this.searchText.length === 0) return;

    // TODO handle search text here
    this.router.navigate(['/search'], { queryParams: { q: this.searchText } });
  }

  handleToggle() {
    this.inputElement.nativeElement.style.transform = 'scaleX(1)';
  }

  blur(e: FocusEvent) {
    if (this.searchText.length > 0) return;
    this.inputElement.nativeElement.style.transform = 'scaleX(0)';
  }
}
