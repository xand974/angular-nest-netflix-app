import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProfileModel } from 'netflix-malet-types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProfileState } from 'src/app/store/profiles/reducers/profiles.reducer';
import { selectCurrentProfile } from '../../../store/profiles/selectors/profiles.selectors';

@Component({
  selector: 'malet-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  currentProfile$: Observable<ProfileModel | null>;

  constructor(private profileStore: Store<ProfileState>) {
    this.currentProfile$ = this.profileStore.select(selectCurrentProfile);
  }

  ngOnInit(): void {}
}
