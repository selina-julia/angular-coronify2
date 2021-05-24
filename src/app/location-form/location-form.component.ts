import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';
import { Vaccination } from '../shared/vaccination';
import { Location } from '../shared/location';
import { LocationService } from '../shared/location.service';
import { DatePipe } from '@angular/common';
import { FormArray, FormControl } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { UserFactory } from '../shared/user-factory';
import { User } from '../shared/user';
import { AuthenticationService } from '../shared/authentication-service';
import { LocationFactory } from '../shared/location-factory';

@Component({
  selector: 'cfy-location-form',
  templateUrl: './location-form.component.html'
})
export class LocationFormComponent implements OnInit {
  //@Input() locations: Location;
  id: bigint;
  locations: Location[];
  vaccinations: Vaccination[];
  locationForm: FormGroup;
  //liefer einen leeren Impftermin
  vaccination = VaccinationFactory.empty();
  user = UserFactory.empty();
  location = LocationFactory.empty();
  isUpdatingLocation = false;

  //assoziatives Array mit string als wert und anfangs ist es leer
  //errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private vs: VaccinationChoiceService,
    private loc: LocationService,
    private vac: VaccinationChoiceService,
    private us: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    //this.loc.getAll().subscribe(res => (this.locations = res));

    // this.vaccination.starttime = new Date(this.vaccination.starttime);

    const id = this.route.snapshot.params['id'];

    console.log(this.route.snapshot);

    console.log(id);
    if (id) {
      this.isUpdatingLocation = true;
      this.loc.getSingle(id).subscribe(location => {
        this.location = location;
        //warum 2x init = asynchron; Rest Call dauert!
        this.initLocation();
      });
    }

    /*if (this.authService.isLoggedIn()) {
      this.us
        .getSingleUserById(localStorage.userId)
        .subscribe(res => (this.user = res));
    }*/

    this.initLocation();
  }

  initLocation() {
    this.locationForm = this.fb.group({
      id: this.location.id,
      //vorgefertigter Validator
      name: this.location.name,
      address: this.location.address,
      postalcode: this.location.postalcode,
      city: this.location.city
    });

    //console.log(this.user.isAdmin);
    /*this.locationForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });*/
  }

  /**Formular kann verschiedene Zustände annehmen:
   *  valid: alles ok,
   *  invalid: mindestens 1 feld ist nicht ok,
   *  dirty: true = wenn der Nutzer bereits mit dem Formular argiert hat
   *  dirty: false = noch keine Interaktion -- noch keine Fehlermeldungen
   **/

  /*updateErrorMessages() {
    this.errors = {};
    for (const message of locationFormErrorMessages) {
      const control = this.locationForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }*/

  saveLocation() {
    const location: Location = LocationFactory.fromObject(
      this.locationForm.value
    );
    //deep copy - did not work without??
    console.log(location);

    console.log(location.name);
    console.log(this.location.name);

    if (this.isUpdatingLocation) {
      //location.id = this.user.vaccination_id;
      //user.isAdmin = this.user.isAdmin;
      console.log('updating');
      this.loc.update(location).subscribe(res => {
        this.router.navigate(['../locations'], {
          relativeTo: this.route
        });
      });
    } else {
      console.log(location);
      console.log('new location');
      this.loc.create(location).subscribe(res => {
        console.log('location created');
        //this.user = UserFactory.empty();
        //this.locationForm.reset(UserFactory.empty());

        this.router.navigate(
          ['../../locations', this.route.snapshot.params['location_id']],
          { relativeTo: this.route }
        );
      });
    }
  }
}
