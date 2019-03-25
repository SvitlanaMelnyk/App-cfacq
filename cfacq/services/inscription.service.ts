import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Service} from './service';
import {map} from 'rxjs/internal/operators';
import {Inscription} from '../app/domaine/inscription';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAllInscriptions(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${environment.apiUrl}/registration/getAllRegistrations`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  deleteInscription(inscription: Inscription) {
    return this.http.post(`${environment.apiUrl}/registration/supprimer`, 'id=' + inscription.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  toggleTraite(inscription: Inscription) {
    return this.http.post(`${environment.apiUrl}/registration/toggleTraiter`, 'id=' + inscription.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
