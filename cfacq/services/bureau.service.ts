import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Service} from './service';
import {JSOG} from '../jsog';
import {Bureau} from '../app/domaine/bureau';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BureauService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Bureau[]> {
    return this.http.get<Bureau[]>(`${environment.apiUrl}/bureau/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  save(bureau: Bureau): Observable<Bureau> {
    return this.http.post(`${environment.apiUrl}/bureau/save`, 'json=' + JSOG.stringify(bureau), this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  deleteBureau(bureau: Bureau) {
    return this.http.post(`${environment.apiUrl}/bureau/supprimer`, 'id=' + bureau.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
