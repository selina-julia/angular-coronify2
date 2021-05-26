import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { VaccinationChoiceService } from "./vaccination-choice.service";

export class UserValidators {

  static userExists(us: VaccinationChoiceService) {
    return function(
      control: FormControl
    ): Observable<{ [error: string]: any }> {
      return us
        .check(control.value)
        .pipe(
          map(exists => (!exists ? null : { userExists: { valid: false } }))
        );
    };
  }
}
