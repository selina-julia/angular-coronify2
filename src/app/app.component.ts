import { Component } from "@angular/core";
import { Vaccination } from "./shared/vaccination";

@Component({
  selector: "bs-root",
  templateUrl: "./app.component.html",
  styles: []
})
export class AppComponent {
  listOn = true;
  detailsOn = false;
  vaccination: Vaccination;

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }
  showDetails(vaccination: Vaccination) {
    this.vaccination = vaccination;
    this.listOn = false;
    this.detailsOn = true;
  }
}
