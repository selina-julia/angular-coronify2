import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination } from '../shared/vaccination';

@Component({
  selector: 'cfy-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  listOn = true;
  detailsOn = false;
  vaccination: Vaccination;
  location: Location;

  constructor(private router: Router, private route: ActivatedRoute) {}

  vaccinationSelected(vaccination: Vaccination) {
    this.router.navigate(['../vaccinations', vaccination.id], {
      relativeTo: this.route
    });
  }
}
