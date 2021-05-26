import { Component, OnInit } from '@angular/core';
import { Location } from '../shared/location';
import { LocationService } from '../shared/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationFactory } from '../shared/location-factory';
import { User, Vaccination } from '../shared/vaccination';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';
import { UserService } from '../shared/user.service';
import { AuthenticationService } from '../shared/authentication-service';
@Component({
  selector: 'cfy-location-details',
  templateUrl: './location-details.component.html',
  styles: []
})
export class LocationDetailsComponent implements OnInit {
  location: Location = LocationFactory.empty();
  vaccinations: Vaccination[];
  vaccination: Vaccination = VaccinationFactory.empty();
  user: User

  constructor(
    private cfy: LocationService,
    private router: Router,
    private route: ActivatedRoute,
    private vs: VaccinationChoiceService,
    private us: UserService,
    public authService: AuthenticationService
  ) {}
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.cfy.getSingle(params['id']).subscribe(b => (this.location = b));

    if (this.authService.isLoggedIn()) {
      this.us
        .getSingleUserById(localStorage.userId)
        .subscribe(res => (this.user = res));
    }
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
