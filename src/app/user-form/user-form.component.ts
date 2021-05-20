import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFactory } from '../shared/user-factory';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { Location } from '../shared/location';
import { LocationService } from '../shared/location.service';
import moment from 'moment';
import { DatePipe } from '@angular/common';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'cfy-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  //@Input() locations: Location;
  id: bigint;
  locations: Location[];
  userForm: FormGroup;
  //liefer einen leeren Impftermin
  user = UserFactory.empty();
  isUpdatingUser = false;
  datePipeStart: string;
  datePipeEnd: string;
  //assoziatives Array mit string als wert und anfangs ist es leer
  //errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private cfy: UserService,
    private loc: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loc.getAll().subscribe(res => (this.locations = res));

    // this.user.starttime = new Date(this.user.starttime);

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingUser = true;
      this.cfy.getSingleUser(id).subscribe(user => {
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
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      ssn: this.user.ssn,
      email: this.user.email,
      birthdate: this.user.birthdate
    });
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
    for (const message of UserFormErrorMessages) {
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
    if (confirm('Willst du dich wirklich zu diesen Impftermin anmelden?')) {
      this.user.vaccination_id = this.user.id;

      this.cfy.saveUser(this.user).subscribe(res => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
    }
  }
}
