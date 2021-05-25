import { Component, OnInit } from '@angular/core';
import { Location } from '../shared/location';
import { LocationService } from '../shared/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationFactory } from '../shared/location-factory';
import { Vaccination } from '../shared/vaccination';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';
@Component({
  selector: 'cfy-location-details',
  templateUrl: './location-details.component.html',
  styles: []
})
export class LocationDetailsComponent implements OnInit {
  location: Location = LocationFactory.empty();
  vaccinations: Vaccination[];
  vaccination: Vaccination = VaccinationFactory.empty();

  constructor(
    private cfy: LocationService,
    private router: Router,
    private route: ActivatedRoute,
    private vs: VaccinationChoiceService
  ) {}
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.cfy.getSingle(params['id']).subscribe(b => (this.location = b));
  }
  getRating(num: number) {
    return new Array(num);
  }
  removeLocation() {
    console.log(this.location.id);
    if (confirm('Buch wirklich löschen?')) {
      this.cfy
        .remove(this.location.id)
        .subscribe(res =>
          this.router.navigate(['../'], { relativeTo: this.route })
        );
    }
  }
}
