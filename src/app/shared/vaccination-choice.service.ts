import { Injectable } from '@angular/core';
import { Vaccination, User } from './vaccination';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { VaccinationFactory } from './vaccination-factory';

@Injectable()
export class VaccinationChoiceService {
  private api = 'https://coronify.s1810456034.student.kwmhgb.at/api';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Array<Vaccination>> {
    return this.http
      .get(`${this.api}/vaccinations`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getLocationName(): Observable<any> {
    return this.http
      .get<Vaccination>(`${this.api}/vaccinations/getLocationName/1`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  getSingle(id: string): Observable<Vaccination> {
    return (
      this.http
        .get<Vaccination>(`${this.api}/vaccinations/${id}`)
        /*.get(`${this.api}/vaccination/${id}`)*/
        .pipe(retry(3))
        .pipe(catchError(this.errorHandler))
    );
  }
  create(vaccination: Vaccination): Observable<any> {
    return this.http
      .post(`${this.api}/vaccinations`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  update(vaccination: Vaccination): Observable<any> {
    return this.http
      .put(`${this.api}/vaccinations/${vaccination.id}`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  remove(id: string): Observable<any> {
    return this.http
      .delete(`${this.api}/vaccinations/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm: string): Observable<Array<Vaccination>> {
    return this.http
      .get<Vaccination>(`${this.api}/vaccinations/search/${searchTerm}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}

/*
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
*/
