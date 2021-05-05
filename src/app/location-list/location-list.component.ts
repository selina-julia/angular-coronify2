import { Component, OnInit } from "@angular/core";
import { Location, Vaccination } from "../shared/location";
@Component({
  selector: "bs-location-list",
  templateUrl: "./location-list.component.html",
  styles: []
})
export class LocationListComponent implements OnInit {
  locations: Location[];
  ngOnInit() {
    this.locations = [
      new Location(1, "Impfzentrum", "Impfstraße 1", 4840, "Vöcklabruck", [
        new Vaccination(1, 100, new Date(2014, 5, 29), new Date(), 1, [])
      ])
    ];
  }
}
