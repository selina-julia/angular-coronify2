import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination } from '../shared/vaccination';
import { Location } from '../shared/location';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';
import { LocationService } from '../shared/location.service';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { AuthenticationService } from '../shared/authentication-service';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'is-vaccination-details',
  templateUrl: './vaccination-details.component.html'
})
export class VaccinationDetailsComponent implements OnInit {
  vaccination: Vaccination = VaccinationFactory.empty();
  user: User;
  @Input() location: Location;
  @Output() showListEvent = new EventEmitter<any>();

  constructor(
    private is: VaccinationChoiceService,
    private is_loc: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
    private is_user: UserService
  ) {}

  //ngOnInit() {}

  ngOnInit() {
    this.fetchData();
  }

  removeVaccination() {
    if (confirm('Wollen Sie den Impftermin wirklich löschen?')) {
      this.is.remove(this.vaccination.id).subscribe(res => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
  }

  removeUser(id) {
    if (
      confirm('Wollen Sie den User mit der ID ' + id + ' wirklich löschen?')
    ) {
      this.is_user.remove(id).subscribe(res => this.fetchData());
    }
  }

  fetchData() {
    //man holt sich die gesamte Route und durch snapshot params bekommt man z.B :isbn
    const params = this.route.snapshot.params;
    //gibt mir die genau dieses Buch mit der ISBN
    this.is_loc.getSingle(params['id']).subscribe(res => (this.location = res));
    this.is.getSingle(params['id']).subscribe(res => (this.vaccination = res));
    console.log(+params['id']);

    if (this.authService.isLoggedIn()) {
      this.is_user
        .getSingleUserById(localStorage.userId)
        .subscribe(res => (this.user = res));
    }
  }
}
