import { Location } from './location';
export class LocationFactory {
  static empty(): Location {
    return new Location(null, '', '', 0, '');
  }
  static fromObject(location: any): Location {
    return new Location(
      location.id,
      location.name,
      location.address,
      location.postalcode,
      location.city
    );
  }
}
