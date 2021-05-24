import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination } from '../shared/vaccination';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';
import { AuthenticationService } from '../shared/authentication-service';

@Component({
  selector: 'cfy-administration',
  templateUrl: './administration.component.html',
  styles: []
})
export class AdministrationComponent {
  listOn = true;
  detailsOn = false;
  vaccination: Vaccination;
  location: Location;
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private is_user: UserService,
    private vs: VaccinationChoiceService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.is_user
        .getSingleUserById(localStorage.userId)
        .subscribe(res => (this.user = res));

      //console.log(this.is_user.getSingleUserById(localStorage.userId));
      console.log(this.user.vaccination_id);
    }
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }
  showDetails(vaccination: Vaccination) {
    this.vaccination = vaccination;
    this.listOn = false;
    this.detailsOn = true;
  }

  vaccinationSelected(vaccination: Vaccination) {
    this.router.navigate(['../vaccinations', vaccination.id], {
      relativeTo: this.route
    });
  }
}
