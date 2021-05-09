import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationListComponent } from './location-list/location-list.component';
import { VaccinationFormComponent } from './vaccination-form/vaccination-form.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'vaccinations', component: VaccinationListComponent },
  { path: 'vaccinations/:id', component: VaccinationDetailsComponent },
  { path: 'locations', component: LocationListComponent },
  { path: 'locations/:id', component: LocationDetailsComponent },
  { path: 'admin', component: VaccinationFormComponent },
  { path: 'admin/:id', component: VaccinationFormComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
