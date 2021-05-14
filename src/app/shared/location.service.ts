import { Injectable } from '@angular/core';
import { Location } from './location';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LocationFactory } from './location-factory';

@Injectable()
export class LocationService {
  private api = 'https://coronify.s1810456034.student.kwmhgb.at/api';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Array<Location>> {
    return this.http
      .get(`${this.api}/locations`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  getSingle(id: string): Observable<Location> {
    return this.http
      .get<Location>(`${this.api}/locations/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  getLocationById(id: number): Observable<Location> {
    return this.http
      .get<Location>(`${this.api}/vaccinationlocation/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  create(location: Location): Observable<any> {
    return this.http
      .post(`${this.api}/location`, location)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  update(location: Location): Observable<any> {
    return this.http
      .put(`${this.api}/location/${location.id}`, location)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  remove(id: string): Observable<any> {
    return this.http
      .delete(`${this.api}/location/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm: string): Observable<Array<Location>> {
    return this.http
      .get<Location>(`${this.api}/locations/search/${searchTerm}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
