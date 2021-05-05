import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Vaccination } from "../shared/vaccination";
import { VaccinationChoiceService } from "../shared/vaccination-choice.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "cfy-vaccination-details",
  templateUrl: "./vaccination-details.component.html",
  styles: []
})
export class VaccinationDetailsComponent implements OnInit {
  vaccination: Vaccination;
  constructor(
    private cfy: VaccinationChoiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.vaccination = this.cfy.getSingle(+params["id"]);
  }
  getRating(num: number) {
    return new Array(num);
  }
}
