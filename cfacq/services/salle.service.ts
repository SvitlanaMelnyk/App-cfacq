import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Service} from './service';
import {JSOG} from '../jsog';
import {environment} from '../environments/environment';
import {Salle} from '../app/domaine/salle';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SalleService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${environment.apiUrl}/salle/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  save(salle: Salle, files: File[]): Observable<Salle> {
    for (const f of salle.fichiers) {
      f.fileImage = undefined;
    }
    const url = `${environment.apiUrl}/salle/save`;
    return this.saveFiles(url, files, JSOG.stringify(salle));
  }

  deleteSalle(salle: Salle) {
    return this.http.post(`${environment.apiUrl}/salle/supprimer`, 'id=' + salle.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
