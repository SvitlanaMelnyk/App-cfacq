import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Service} from './service';
import {JSOG} from '../jsog';
import {environment} from '../environments/environment';
import {Poste} from '../app/domaine/poste';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PosteService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${environment.apiUrl}/poste/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  save(bureau: Poste): Observable<Poste> {
    return this.http.post(`${environment.apiUrl}/poste/save`, 'json=' + JSOG.stringify(bureau), this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  deletePoste(bureau: Poste) {
    return this.http.post(`${environment.apiUrl}/poste/supprimer`, 'id=' + bureau.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
