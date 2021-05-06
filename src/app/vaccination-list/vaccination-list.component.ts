import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination, User } from '../shared/vaccination';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';
import { VaccinationFactory } from '../shared/vaccination-factory';

@Component({
  selector: 'cfy-vaccination-list',
  templateUrl: './vaccination-list.component.html',
  styles: []
})
export class VaccinationListComponent implements OnInit {
  vaccinations: Vaccination[];

  @Output() showDetailsEvent = new EventEmitter<Vaccination>();

  constructor(
    private cfy: VaccinationChoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cfy.getAll().subscribe(res => (this.vaccinations = res));
  }
  showDetails(vaccination: Vaccination) {
    this.showDetailsEvent.emit(vaccination);
  }
}
