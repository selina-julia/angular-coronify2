import { Vaccination } from "./vaccination";
export class VaccinationFactory {
  static empty(): Vaccination {
    return new Vaccination(null, 0, new Date(), new Date(), 0, [
      {
        id: 0,
        ssn: 0,
        firstname: "",
        lastname: "",
        gender: "",
        birthdate: new Date(),
        phone: "",
        email: "",
        password: "",
        hasVaccination: false,
        isAdmin: false
      }
    ]);
  }
  static fromObject(rawVaccination: any): Vaccination {
    return new Vaccination(
      rawVaccination.id,
      rawVaccination.maxParticipants,
      typeof rawVaccination.date === "string"
        ? new Date(rawVaccination.date)
        : rawVaccination.date,
      typeof rawVaccination.time === "string"
        ? new Date(rawVaccination.time)
        : rawVaccination.time,
      rawVaccination.location_id,
      rawVaccination.users
    );
  }
}
