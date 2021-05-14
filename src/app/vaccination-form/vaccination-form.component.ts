import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination } from '../shared/vaccination';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';
import { DatePipe } from '@angular/common';
import { LocationService } from '../shared/location.service';
import { Location } from '../shared/location';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { ToastrService } from 'ngx-toastr';
import { VaccinationFormErrorMessages } from './vaccination-form-error-messages';
import moment from 'moment';

@Component({
  selector: 'cfy-vaccination-form',
  templateUrl: './vaccination-form.component.html'
})
export class VaccinationFormComponent implements OnInit {
  id: bigint;
  vaccinationForm: FormGroup;
  isUpdatingVaccination = false;
  errors: { [key: string]: string } = {};
  datePipeStart: string;
  datePipeEnd: string;
  location: Location[];
  vaccination: Vaccination = VaccinationFactory.empty();
  state: string = '';

  constructor(
    private fb: FormBuilder,
    private vac: VaccinationChoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private vacloc: LocationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.state = this.route.snapshot.params['state'];
    if (id !== undefined) {
      this.isUpdatingVaccination = true;
      this.vac.getSingle(id).subscribe(vaccination => {
        this.vaccination = vaccination;
        this.initVaccination();
      });
    }
    /*this.vacloc.getLocationByState(this.state).subscribe(location => {
      this.location = location;
      this.initVaccination();
    }); */
    this.initVaccination();
  }

  initVaccination() {
    this.datePipeStart = this.datePipe.transform(
      this.vaccination.starttime,
      'HH:mm'
    );
    this.datePipeEnd = this.datePipe.transform(
      this.vaccination.endtime,
      'HH:mm'
    );

    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      location_id: [this.vaccination.location_id, Validators.required],
      maxVac: [
        this.vaccination.maxParticipants,
        [Validators.required, Validators.min(1)]
      ],
      date: [this.vaccination.date, Validators.required],
      starttime: [this.datePipeStart, Validators.required],
      endtime: [this.datePipeEnd, Validators.required]
    });
    this.vaccinationForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

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

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  submitForm() {
    let updatedVaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );
    console.log(this.vaccinationForm.value.startTime);
    const startTimeNew = moment(
      this.vaccinationForm.value.date +
        ' ' +
        this.vaccinationForm.value.startTime
    ).toDate();
    const endTimeNew = moment(
      this.vaccinationForm.value.date + ' ' + this.vaccinationForm.value.endTime
    ).toDate();
    updatedVaccination.starttime = startTimeNew;
    updatedVaccination.endtime = endTimeNew;
    this.vacloc
      .getSingle(this.vaccinationForm.controls['location_id'].value)
      .subscribe(res => {
        updatedVaccination.location = res;
      });

    if (this.isUpdatingVaccination)
      updatedVaccination.users = this.vaccination.users;
    else updatedVaccination.users = [];

    if (this.isUpdatingVaccination) {
      this.vac.update(updatedVaccination).subscribe(res => {
        this.toastr.success('Impftermin erfolgreich geändert');
        this.reloadCurrentRoute();
      });
    } else {
      this.vac.create(updatedVaccination).subscribe(res => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
    }
  }
}
