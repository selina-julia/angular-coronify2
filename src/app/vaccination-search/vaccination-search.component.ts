import { Component, EventEmitter, OnInit } from "@angular/core";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Vaccination } from "../shared/vaccination";
import { VaccinationChoiceService } from "../shared/vaccination-choice.service";
@Component({
  selector: "cfy-vaccination-search",
  templateUrl: "./vaccination-search.component.html",
  styles: []
})
export class VaccinationSearchComponent implements OnInit {
  foundVaccinations: Vaccination[] = [];
  keyup = new EventEmitter<string>();
  constructor(private bs: VaccinationChoiceService) {}
  ngOnInit() {
    this.keyup
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm)))
      .subscribe(vaccinations => (this.foundVaccinations = vaccinations));
  }
}
