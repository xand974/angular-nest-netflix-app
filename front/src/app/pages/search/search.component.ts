import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'malet-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchTextFromParam: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.searchTextFromParam = '';
  }

  ngOnInit(): void {
    this.checkEmptyInput();
    console.log(this.searchTextFromParam);
  }

  /**
   * @name checkEmptyInput
   * @description
   * - checks if the query param is empty
   * - then redirect to home page
   * @returns
   */
  checkEmptyInput() {
    const searchParam = this.route.snapshot.queryParamMap.get('q');
    if (!searchParam || searchParam.length === 0) {
      this.router.navigate(['/home']);
      return;
    }
    this.searchTextFromParam = searchParam;
  }
}
