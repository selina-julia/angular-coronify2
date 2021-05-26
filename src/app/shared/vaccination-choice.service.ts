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
  getSingle(id: number): Observable<Vaccination> {
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
      .post(`${this.api}/vaccinations/save`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  update(vaccination: Vaccination): Observable<any> {
    return this.http
      .put(`${this.api}/vaccinations/${vaccination.id}`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
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

  /*custom validators*/
  check(time: Date): Observable<User> {
    return this.http
      .get<User>(`${this.api}/user/check/${time}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
  checkMail(email: string): Observable<User> {
    return this.http
      .get<User>(`${this.api}/user/checkMail/${email}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
