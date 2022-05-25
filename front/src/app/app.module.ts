import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RegisterModule } from './pages/register/register.module';
import {
  NbThemeModule,
  NbLayoutModule,
  NbDialogModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import {
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  compose,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { authReducer, AuthState } from './shared/auth/reducer/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  profilesReducer,
  ProfileState,
} from './shared/profiles/reducers/profiles.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

interface AppState {
  auth: AuthState;
  profiles: ProfileState;
}
export const reducers = {
  auth: authReducer,
  profiles: profilesReducer,
};

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return localStorageSync({
    keys: Object.keys(reducers),
    rehydrate: true,
  })(reducer);
}
const metaReducers: Array<MetaReducer<AppState>> = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbEvaIconsModule,
    RegisterModule,
    NbThemeModule.forRoot({ name: 'default' }),
    BrowserAnimationsModule,
    NbDialogModule.forRoot({
      hasBackdrop: true,
      hasScroll: false,
      closeOnBackdropClick: false,
    }),
    NbSpinnerModule,
    PagesModule,
    NbLayoutModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
