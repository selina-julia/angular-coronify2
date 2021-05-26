import { User } from './user';

export class UserFactory {
  static empty(): User {
    return new User(0, 0, '', '', '', new Date(), '', '', '', false, false, 0);
  }

  static fromObject(rawUser: any): User {
    return new User(
      rawUser.id,
      rawUser.ssn,
      rawUser.firstname,
      rawUser.lastname,
      rawUser.gender,
      typeof rawUser.birthdate === 'string'
        ? new Date(rawUser.birthdate)
        : rawUser.birthdate,
      rawUser.phone,
      rawUser.email,
      rawUser.password,
      rawUser.hasVaccination,
      rawUser.isAdmin,
      rawUser.vaccination_id
    );
  }
}
