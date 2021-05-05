import { Component, OnInit, Input } from "@angular/core";
import { Vaccination } from "../shared/vaccination";
@Component({
  selector: "a.cfy-vaccination-list-item",
  templateUrl: "./vaccination-list-item.component.html",
  styles: []
})
export class VaccinationListItemComponent implements OnInit {
  @Input() vaccination: Vaccination;
  constructor() {}
  ngOnInit() {}
}
