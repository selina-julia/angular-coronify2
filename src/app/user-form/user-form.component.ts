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

@Component({
  selector: 'cfy-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  //@Input() locations: Location;
  id: bigint;
  locations: Location[];
  vaccinations: Vaccination[];
  userForm: FormGroup;
  //liefer einen leeren Impftermin
  vaccination = VaccinationFactory.empty();
  user = UserFactory.empty();
  isUpdatingUser = false;

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
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    //this.loc.getAll().subscribe(res => (this.locations = res));

    // this.vaccination.starttime = new Date(this.vaccination.starttime);

    const id = this.route.snapshot.params['id'];

    console.log(this.route.snapshot);

    console.log(id);
    if (id) {
      this.isUpdatingUser = true;
      this.us.getSingleUserById(id).subscribe(user => {
        this.user = user;
        //warum 2x init = asynchron; Rest Call dauert!
        this.initUser();
      });
    }
    this.initUser();
  }

  initUser() {
    this.userForm = this.fb.group({
      id: this.user.id,
      //vorgefertigter Validator
      vaccination_id: +this.route.snapshot.params['vaccination_id'],
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      birthdate: this.user.birthdate,
      ssn: this.user.ssn,
      email: this.user.email,
      gender: 'm',
      hasVaccination: 0,
      isAdmin: 0,
      password: '$2y$10$5Wep7W2vPo4EWYc.1wbJte3ChN5jLmEkL52bTOt51/EdKM2F8UH5.',
      phone: '786858'
    });

    console.log(this.user.isAdmin);
    /*this.userForm.statusChanges.subscribe(() => {
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
    for (const message of userFormErrorMessages) {
      const control = this.userForm.get(message.forControl);
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

  addUserToVaccination() {
    const user: User = UserFactory.fromObject(this.userForm.value);
    //deep copy - did not work without??
    console.log(user);

    console.log(user.firstname);
    console.log(this.user.isAdmin);
    user.birthdate = this.userForm.value.birthdate;

    if (this.isUpdatingUser) {
      user.vaccination_id = this.user.vaccination_id;
      user.isAdmin = this.user.isAdmin;
      console.log('updating');
      this.us.update(user).subscribe(res => {
        this.router.navigate(['../../../vaccinations', user.vaccination_id], {
          relativeTo: this.route
        });
      });
    } else {
      console.log(user);
      console.log('new user');
      this.us.create(user).subscribe(res => {
        console.log('user created');
        //this.user = UserFactory.empty();
        //this.userForm.reset(UserFactory.empty());

        this.router.navigate(
          ['../../vaccinations', this.route.snapshot.params['vaccination_id']],
          { relativeTo: this.route }
        );
      });
    }
  }
}
