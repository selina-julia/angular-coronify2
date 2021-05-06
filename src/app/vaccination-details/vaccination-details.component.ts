import { Component, OnInit } from "@angular/core";
import { Vaccination } from "../shared/vaccination";
import { VaccinationChoiceService } from "../shared/vaccination-choice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { VaccinationFactory } from "../shared/vaccination-factory";
@Component({
  selector: "cfy-vaccination-details",
  templateUrl: "./vaccination-details.component.html",
  styles: []
})
export class VaccinationDetailsComponent implements OnInit {
  vaccination: Vaccination = VaccinationFactory.empty();
  constructor(
    private cfy: VaccinationChoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.cfy.getSingle(params["id"]).subscribe(b => (this.vaccination = b));
    
  }
  getRating(num: number) {
    return new Array(num);
  }
  removeVaccination() {
    if (confirm("Buch wirklich löschen?")) {
      this.cfy.remove[this.vaccination.id].subscribe(res =>
        this.router.navigate(["../"], { relativeTo: this.route })
      );
    }
  }
}
