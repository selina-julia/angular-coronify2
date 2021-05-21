import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { UserFactory } from '../shared/user-factory';
import { UserService } from '../shared/user.service';
import { User, Vaccination } from '../shared/vaccination';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';

@Component({
  selector: 'cfy-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  vaccination: Vaccination = VaccinationFactory.empty();
  activeUser: User = UserFactory.empty();
  selectedGender: string;
  genders: string[] = ['männlich', 'weiblich', 'divers'];
  userForm: FormGroup;

  constructor(
    private vs: VaccinationChoiceService,
    private route: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe,
    private us: UserService,
    public authService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstname: this.activeUser.firstname,
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      ssn: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });

    const params = this.route.snapshot.params;
    this.vs.getSingle(params['id']).subscribe(res => {
      this.vaccination = res;
    });

    if (this.authService.isLoggedIn()) {
      this.us
        .getSingleUserById(this.authService.getCurrentUserId())
        .subscribe(res => {
          this.activeUser = res;
        });
    }
  }

  addUserToVaccination() {
    if (confirm('Willst du dich wirklich zu diesen Impftermin anmelden?')) {
      this.activeUser.vaccination_id = this.vaccination.id;
      this.activeUser.gender = this.selectedGender;
      console.log(this.activeUser);

      this.us.saveUser(this.activeUser).subscribe(res => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
  }
}
