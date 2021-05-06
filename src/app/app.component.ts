import { Component } from "@angular/core";
import { Vaccination } from "./shared/vaccination";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "bs-root",
  templateUrl: "./app.component.html",
  styles: []
})
export class AppComponent {
  listOn = true;
  detailsOn = false;
  vaccination: Vaccination;
  location: Location;

  constructor(private router: Router, private route: ActivatedRoute) {}

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }
  showDetails(vaccination: Vaccination) {
    this.vaccination = vaccination;
    this.listOn = false;
    this.detailsOn = true;
  }

  vaccinationSelected(vaccination: Vaccination) {
    this.router.navigate(["../vaccinations", vaccination.id], {
      relativeTo: this.route
    });
  }
}
