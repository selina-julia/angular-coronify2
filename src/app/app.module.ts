import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { LOCALE_ID } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { VaccinationListComponent } from "./vaccination-list/vaccination-list.component";
import { VaccinationListItemComponent } from "./vaccination-list-item/vaccination-list-item.component";
import { VaccinationDetailsComponent } from "./vaccination-details/vaccination-details.component";
import { VaccinationSearchComponent } from "./vaccination-search/vaccination-search.component";
import { VaccinationChoiceService } from "./shared/vaccination-choice.service";
import { HttpClientModule } from "@angular/common/http";

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    VaccinationListComponent,
    VaccinationListItemComponent,
    VaccinationDetailsComponent,
    VaccinationSearchComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [VaccinationChoiceService, { provide: LOCALE_ID, useValue: "de" }],
  bootstrap: [AppComponent]
})
export class AppModule {}
