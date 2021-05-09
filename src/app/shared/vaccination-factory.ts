import { Vaccination } from './vaccination';
export class VaccinationFactory {
  static empty(): Vaccination {
    return new Vaccination(
      null,
      0,
      new Date(),
      new Date(),
      new Date(),
      0,
      { id: 0, name: '', address: '', postalcode: 0, city: ''},
      [
        {
          id: 0,
          ssn: 0,
          firstname: '',
          lastname: '',
          gender: '',
          birthdate: new Date(),
          phone: '',
          email: '',
          password: '',
          hasVaccination: false,
          isAdmin: false
        }
      ]
    );
  }
  static fromObject(vaccination: any): Vaccination {
    return new Vaccination(
      vaccination.id,
      vaccination.maxParticipants,
      typeof vaccination.date === 'string'
        ? new Date(vaccination.date)
        : vaccination.date,
      typeof vaccination.starttime === 'string'
        ? new Date(vaccination.starttime)
        : vaccination.starttime,
      typeof vaccination.endtime === 'string'
        ? new Date(vaccination.endtime)
        : vaccination.endtime,
      vaccination.location_id,
      vaccination.location,
      vaccination.users
    );
  }
}
