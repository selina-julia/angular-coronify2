import { Component } from '@angular/core';
import { Vaccination } from './shared/vaccination';
import { Location } from './shared/location';
import { User } from './shared/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './shared/authentication-service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  listOn = true;
  detailsOn = false;
  vaccination: Vaccination;
  location: Location;
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private is_user: UserService
  ) {}

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.is_user
        .getSingleUserById(localStorage.userId)
        .subscribe(res => (this.user = res));

    }
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

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return 'Logout';
    } else {
      return 'Login';
    }
  }

  vaccinationSelected(vaccination: Vaccination) {
    this.router.navigate(['../vaccinations', vaccination.id], {
      relativeTo: this.route
    });
  }
}
