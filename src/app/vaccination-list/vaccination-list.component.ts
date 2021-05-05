import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Vaccination, User } from "../shared/vaccination";
import { VaccinationChoiceService } from "../shared/vaccination-choice.service";

@Component({
  selector: "cfy-vaccination-list",
  templateUrl: "./vaccination-list.component.html",
  styles: []
})
export class VaccinationListComponent implements OnInit {
  vaccinations: Vaccination[];
  @Output() showDetailsEvent = new EventEmitter<Vaccination>();

  constructor(private cfy: VaccinationChoiceService) {}

  ngOnInit() {
    this.vaccinations = this.cfy.getAll();
  }
  showDetails(vaccination: Vaccination) {
    this.showDetailsEvent.emit(vaccination);
  }
}
