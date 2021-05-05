import { Component } from "@angular/core";
@Component({
  selector: "cfy-home",
  template: `
    <div class="ui container">
      <h1>Home</h1>
      <p>hello this is home.</p>
      <a routerLink="../vaccinations" class="ui cfy-button">
        Impftermine ansehen
      </a>
    </div>
  `,
  styles: []
})
export class HomeComponent {}
