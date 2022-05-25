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
import { InterceptorService } from './services/interceptor/interceptor.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './store/meta/meta.reducers';

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
