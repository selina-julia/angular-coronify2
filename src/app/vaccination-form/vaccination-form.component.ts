import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';
import { Vaccination } from '../shared/vaccination';
import { Location } from '../shared/location';
import { VaccinationFormErrorMessages } from './vaccination-form-error-messages';
import { LocationService } from '../shared/location.service';

@Component({
  selector: 'cfy-vaccination-form',
  templateUrl: './vaccination-form.component.html'
})
export class VaccinationFormComponent implements OnInit {
  //@Input() locations: Location;
  locations: Location[];
  vaccinationForm: FormGroup;
  //liefer einen leeren Impftermin
  vaccination = VaccinationFactory.empty();
  isUpdatingVaccination = false;
  datePipeTime: string;
  datePipeDate: string;
  //assoziatives Array mit string als wert und anfangs ist es leer
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private cfy: VaccinationChoiceService,
    private loc: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.loc.getAll().subscribe(res => (this.locations = res));

    this.vaccination.starttime = new Date(this.vaccination.starttime);

    //is der Parameter ID bei der URL angehängt --> wird es gerade upgedated
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
    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      //vorgefertigter Validator
      location_id: [this.vaccination.location_id],
      //date: [this.datePipeDate, Validators.required],
      //starttime: [this.datePipeTime, Validators.required],
      //endtime: [this.datePipeTime, Validators.required],
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
    console.log(this.vaccinationForm.value);
    console.log('hi');
    const updatedVaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );

    this.loc
      .getSingle(this.vaccinationForm.controls['location_id'].value)
      .subscribe(res => {
        updatedVaccination.location = res;
      });

    if (this.isUpdatingVaccination) {
      this.cfy.update(updatedVaccination).subscribe(res => {
        this.router.navigate(['../../vaccinations', updatedVaccination.id], {
          relativeTo: this.route
        });
      });
    } else {
      this.cfy.create(updatedVaccination).subscribe(res => {
        this.router.navigate(['../vaccinations'], { relativeTo: this.route });
      });
    }
  }
}
