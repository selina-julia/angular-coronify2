import { Location } from "./location";
export class LocationFactory {
  static empty(): Location {
    return new Location(null, "", "", 0, "", [
      {
        id: 0,
        maxParticipants: 0,
        starttime: new Date(),
        endtime: new Date(),
        date: new Date(),
        location_id: 0
      }
    ]);
  }
  static fromObject(location: any): Location {
    return new Location(
      location.id,
      location.name,
      location.address,
      location.postalcode,
      location.city,
      location.vaccinations
    );
  }
}
