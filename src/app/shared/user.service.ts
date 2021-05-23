import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './user';

@Injectable()
export class UserService {
  private api = 'https://coronify.s1810456034.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getAllUsers(username: string): Observable<User> {
    return this.http
      .get<User>(`${this.api}/user/${username}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingleUser(username: string): Observable<User> {
    return this.http
      .get<User>(`${this.api}/users/${username}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingleUserById(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.api}/user/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(user: User): Observable<any> {
    return this.http
      .post(`${this.api}/user/save`, user)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(user: User): Observable<any> {
    return this.http
      .put(`${this.api}/users/${user.id}`, user)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any) {
    return throwError(error);
  }
}
