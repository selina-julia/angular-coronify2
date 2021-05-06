import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Location, Vaccination } from "../shared/location";
import { LocationService } from "../shared/location.service";

@Component({
  selector: "cfy-location-list",
  templateUrl: "./location-list.component.html",
  styles: []
})
export class LocationListComponent implements OnInit {
  locations: Location[];
  @Output() showDetailsEvent = new EventEmitter<Location>();

  constructor(private cfy: LocationService) {}

  ngOnInit() {
    this.cfy.getAll().subscribe(res => (this.locations = res));
  }
  showDetails(location: Location) {
    this.showDetailsEvent.emit(location);
  }
}
