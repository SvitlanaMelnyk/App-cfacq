import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Service} from './service';
import {JSOG} from '../jsog';
import {environment} from '../environments/environment';
import {Local} from '../app/domaine/local';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LocauxService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Local[]> {
    return this.http.get<Local[]>(`${environment.apiUrl}/local/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  save(local: Local): Observable<Local> {
    return this.http.post(`${environment.apiUrl}/local/save`, 'json=' + JSOG.stringify(local), this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  deleteLocal(local: Local) {
    return this.http.post(`${environment.apiUrl}/local/supprimer`, 'id=' + local.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
