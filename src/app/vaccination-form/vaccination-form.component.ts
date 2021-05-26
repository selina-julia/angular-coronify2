import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';
import { Vaccination } from '../shared/vaccination';
import { Location } from '../shared/location';
import { VaccinationFormErrorMessages } from './vaccination-form-error-messages';
import { LocationService } from '../shared/location.service';
import moment from 'moment';
import { DatePipe } from '@angular/common';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'cfy-vaccination-form',
  templateUrl: './vaccination-form.component.html'
})
export class VaccinationFormComponent implements OnInit {
  //@Input() locations: Location;
  id: bigint;
  locations: Location[];
  vaccinationForm: FormGroup;
  //liefer einen leeren Impftermin
  vaccination = VaccinationFactory.empty();
  isUpdatingVaccination = false;
  datePipeStart: string;
  datePipeEnd: string;
  //assoziatives Array mit string als wert und anfangs ist es leer
  errors: { [key: string]: string } = {};
  vacToLoc = false;
  loc_id = this.vaccination.location_id;

  constructor(
    private fb: FormBuilder,
    private cfy: VaccinationChoiceService,
    private loc: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loc.getAll().subscribe(res => (this.locations = res));

    if (
      this.route.snapshot.params['location_id'] != null &&
      this.isUpdatingVaccination == false
    ) {
      console.log(this.route.snapshot.params['location_id']);
      this.vacToLoc = true;
      this.loc_id = this.route.snapshot.params['location_id'];
    } else {
      this.loc_id = this.vaccination.location_id;
      console.log('updating true');
    }

    console.log(this.loc_id);

    // this.vaccination.starttime = new Date(this.vaccination.starttime);

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingVaccination = true;
      this.cfy.getSingle(id).subscribe(vaccination => {
        this.vaccination = vaccination;
        //warum 2x init = asynchron; Rest Call dauert!
        this.initVaccination();
      });
    }

    this.initVaccination();
  }

  initVaccination() {
    if (this.isUpdatingVaccination == true) {
      console.log(this.vaccination.location_id);
      this.loc_id = this.vaccination.location_id;
      console.log(this.loc_id);
    }

    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      //vorgefertigter Validator
      location_id: [this.loc_id],
      location: [this.vaccination.location],
      date: [this.vaccination.date, Validators.required],
      starttime: [this.vaccination.starttime, Validators.required],
      endtime: this.vaccination.endtime,
      maxParticipants: [
        this.vaccination.maxParticipants,
        [Validators.required, Validators.minLength(1)]
      ]
    });
    this.vaccinationForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  /**Formular kann verschiedene Zustände annehmen:
   *  valid: alles ok,
   *  invalid: mindestens 1 feld ist nicht ok,
   *  dirty: true = wenn der Nutzer bereits mit dem Formular argiert hat
   *  dirty: false = noch keine Interaktion -- noch keine Fehlermeldungen
   **/

  updateErrorMessages() {
    this.errors = {};
    for (const message of VaccinationFormErrorMessages) {
      const control = this.vaccinationForm.get(message.forControl);
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
  }

  submitForm() {
    const vaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );
    //deep copy - did not work without??
    vaccination.date = this.vaccinationForm.value.date;
    vaccination.starttime = this.vaccinationForm.value.starttime;
    vaccination.endtime = this.vaccinationForm.value.endtime;
    console.log(vaccination);

    console.log(vaccination.location.city);

    console.log();
    if (this.vaccination.starttime < this.vaccination.endtime) {
      alert('Achtung! Die Endzeit muss größer sein als die Startzeit');
    }

    this.loc
      .getSingle(this.vaccinationForm.controls['location_id'].value)
      .subscribe(res => {
        vaccination.location = res;
      });

    if (this.isUpdatingVaccination) {
      this.cfy.update(vaccination).subscribe(res => {
        this.router.navigate(['../../vaccinations', vaccination.id], {
          relativeTo: this.route
        });
      });
    } else {
      console.log(vaccination);
      this.cfy.create(vaccination).subscribe(res => {
        this.vaccination = VaccinationFactory.empty();
        this.vaccinationForm.reset(VaccinationFactory.empty());
        if (this.vacToLoc == true) {
          console.log('hi again');
          console.log(this.vaccination.starttime);
          this.router.navigate(['../../locations', vaccination.location_id], {
            relativeTo: this.route
          });
        } else {
          this.router.navigate(['../vaccinations'], {
            relativeTo: this.route
          });
        }
      });
    }
  }
}
