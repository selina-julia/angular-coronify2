import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';
import { VaccinationFormErrorMessages } from './vaccination-form-error-messages';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';
import { Vaccination } from '../shared/vaccination';
import { Location } from '../shared/location';
import { LocationService } from "../shared/location.service";

@Component({
  selector: 'bs-vaccination-form',
  templateUrl: './vaccination-form.component.html'
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingVaccination = false;
  images: FormArray;
  locations: Location[];
  constructor(
    private fb: FormBuilder,
    private bs: VaccinationChoiceService,
    private route: ActivatedRoute,
    private is_loc: LocationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.is_loc.getAll().subscribe(res => (this.locations = res));
    const isbn = this.route.snapshot.params['isbn'];
    if (isbn) {
      this.isUpdatingVaccination = true;
      this.bs.getSingle(isbn).subscribe(vaccination => {
        this.vaccination = vaccination;
        this.initVaccination();
      });
    }
    this.initVaccination();
  }
  initVaccination() {
    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      starttime: [this.vaccination.starttime, Validators.required],
      endtime: this.vaccination.endtime,
      date: this.vaccination.date,
      maxParticipants: this.vaccination.maxParticipants
    });
    this.vaccinationForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    );
  }
  submitForm() {
    // filter empty values
    const vaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );
    console.log(vaccination);
    //just copy the authors
    if (this.isUpdatingVaccination) {
      this.bs.update(vaccination).subscribe(res => {
        this.router.navigate(['../../vaccinations', vaccination.id], {
          relativeTo: this.route
        });
      });
    } else {
      console.log(vaccination);
      this.bs.create(vaccination).subscribe(res => {
        this.vaccination = VaccinationFactory.empty();
        this.vaccinationForm.reset(VaccinationFactory.empty());
        this.router.navigate(['../vaccinations'], { relativeTo: this.route });
      });
    }
  }
  updateErrorMessages() {
    console.log('Is invalid? ' + this.vaccinationForm.invalid);
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
}
