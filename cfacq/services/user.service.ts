import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Service} from './service';
import {JSOG} from '../jsog';
import {environment} from '../environments/environment';
import {Salle} from '../app/domaine/salle';
import {AuthenticationService} from './authentication.service';
import {User} from '../app/domaine/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/utilisateur/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  save(user: User, password: string): Observable<User> {
    return this.http.post(`${environment.apiUrl}/utilisateur/save`, 'json=' + JSOG.stringify(user) + '&password=' + password, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  changePassword(user: User, password: string): Observable<User> {
    return this.http.post(`${environment.apiUrl}/utilisateur/changePassword`, 'id=' + user.id + '&password=' + password, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  deleteUser(user: User) {
    return this.http.post(`${environment.apiUrl}/utilisateur/supprimer`, 'id=' + user.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getLink(user: User): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}/utilisateur/getLink?id=${user.id}`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getContacts(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/utilisateur/getContacts`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  loginExt(i: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/loginExt?i=${i}`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
}
