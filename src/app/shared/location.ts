import { Vaccination } from './vaccination';
export { Vaccination } from './vaccination';

export class Location {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public postalcode: number,
    public city: string,
    public vaccinations?: Vaccination[]
  ) {}
}
