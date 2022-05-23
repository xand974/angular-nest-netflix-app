import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RegisterModule } from './pages/register/register.module';
import { NbThemeModule, NbLayoutModule, NbDialogModule } from '@nebular/theme';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './shared/auth/reducer/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    PagesModule,
    NbLayoutModule,
    HttpClientModule,
    StoreModule.forRoot({ auth: authReducer }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
