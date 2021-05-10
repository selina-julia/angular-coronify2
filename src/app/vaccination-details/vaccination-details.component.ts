import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Vaccination } from '../shared/vaccination';
import { VaccinationChoiceService } from '../shared/vaccination-choice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationFactory } from '../shared/vaccination-factory';
@Component({
  selector: 'cfy-vaccination-details',
  templateUrl: './vaccination-details.component.html',
  styles: []
})
export class VaccinationDetailsComponent implements OnInit {
  @Input() vaccination: Vaccination;
  @Input() location: Location;
  @Output() showListEvent = new EventEmitter<any>();

  /*vaccination: Vaccination = VaccinationFactory.empty();*/
  constructor(
    private cfy: VaccinationChoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    //holt sich die gesamte Route und durch snapshot params bekommt man z.B :isbn
    const params = this.route.snapshot.params;
    this.cfy.getSingle(params['id']).subscribe(res => (this.vaccination = res));
  }

  removeVaccination() {
    if (confirm('Impftermin wirklich löschen?')) {
      this.cfy.remove[this.vaccination.id].subscribe(res =>
        this.router.navigate(['../'], { relativeTo: this.route })
      );
      console.log(this.vaccination.id);
    }
  }
}
