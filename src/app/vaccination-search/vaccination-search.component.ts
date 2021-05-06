import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  debounceTime,
  filter,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";
import { Vaccination } from "../shared/vaccination";
import { VaccinationChoiceService } from "../shared/vaccination-choice.service";
@Component({
  selector: "cfy-vaccination-search",
  templateUrl: "./vaccination-search.component.html",
  styles: []
})
export class VaccinationSearchComponent implements OnInit {
  foundVaccinations: Vaccination[] = [];
  isLoading = false;
  keyup = new EventEmitter<string>();
  @Output() vaccinationSelected = new EventEmitter<Vaccination>();
  constructor(private bs: VaccinationChoiceService) {}
  ngOnInit() {
    this.keyup
      .pipe(filter(term => term != ""))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => (this.isLoading = true)))
      .pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm)))
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe(vaccinations => (this.foundVaccinations = vaccinations));
  }
}
