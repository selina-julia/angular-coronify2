import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { VaccinationListItemComponent } from './vaccination-list-item/vaccination-list-item.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { VaccinationSearchComponent } from './vaccination-search/vaccination-search.component';
import { VaccinationChoiceService } from './shared/vaccination-choice.service';
import { VaccinationFormComponent } from './vaccination-form/vaccination-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { AdministrationComponent } from './administration/administration.component';

import { LocationListComponent } from './location-list/location-list.component';
import { LocationListItemComponent } from './location-list-item/location-list-item.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationService } from './shared/location.service';
import { UserService } from './shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from './shared/authentication-service';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { JwtInterceptorService } from './shared/jwt.interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    VaccinationListComponent,
    VaccinationListItemComponent,
    VaccinationDetailsComponent,
    VaccinationSearchComponent,
    LocationListComponent,
    LocationListItemComponent,
    LocationDetailsComponent,
    LocationFormComponent,
    VaccinationFormComponent,
    UserFormComponent,
    LoginComponent,
    HomeComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    VaccinationChoiceService,
    LocationService,
    UserService,
    AuthenticationService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'de' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
