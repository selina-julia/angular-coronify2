import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { LOCALE_ID } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { LocationListComponent } from "./location-list/location-list.component";
import { VaccinationListComponent } from "./vaccination-list/vaccination-list.component";
import { LocationListItemComponent } from "./location-list-item/location-list-item.component";
import { VaccinationListItemComponent } from "./vaccination-list-item/vaccination-list-item.component";
import { VaccinationDetailsComponent } from "./vaccination-details/vaccination-details.component";
import { VaccinationChoiceService } from "./shared/vaccination-choice.service";

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    LocationListComponent,
    LocationListItemComponent,
    VaccinationListComponent,
    VaccinationListItemComponent,
    VaccinationDetailsComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [VaccinationChoiceService, { provide: LOCALE_ID, useValue: "de" }],
  bootstrap: [AppComponent]
})
export class AppModule {}
