import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RegisterModule } from './pages/register/register.module';
import { NbThemeModule } from '@nebular/theme';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbEvaIconsModule,
    RegisterModule,
    NbThemeModule.forRoot(),
    BrowserAnimationsModule,
    PagesModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
