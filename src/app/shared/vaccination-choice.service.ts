import { Injectable } from "@angular/core";
import { Vaccination, User } from "./vaccination";
@Injectable()
export class VaccinationChoiceService {
  vaccinations: Vaccination[];
  constructor() {
    this.vaccinations = [
      new Vaccination(
        1,
        100,
        new Date(2021, 5, 4),
        new Date(2021, 5, 4, 12, 0, 0),
        1,
        [
          new User(
            1,
            3217230898,
            "Selina",
            "Schindlauer",
            "f",
            new Date(2021, 5, 5),
            "phone",
            "mail",
            "password",
            true,
            false
          ),
          new User(
            2,
            3217230898,
            "Vanessa",
            "Riener",
            "f",
            new Date(),
            "phone",
            "mail",
            "password",
            true,
            false
          )
        ]
      ),
      new Vaccination(2, 111, new Date(), new Date(), 1, [])
    ];
  }
  getAll() {
    return this.vaccinations;
  }

  getSingle(id: number): Vaccination {
    return this.vaccinations.find(vaccination => vaccination.id === id);
  }
}
