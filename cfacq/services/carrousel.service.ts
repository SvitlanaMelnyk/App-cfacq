import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Service} from './service';
import {Fichier} from '../app/domaine/fichier';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CarrouselService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Fichier[]> {
    return this.http.get<Fichier[]>(`${environment.apiUrl}/carrousel/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getAllWithImage(): Observable<Fichier[]> {
    return this.http.get<Fichier[]>(`${environment.apiUrl}/carrousel/getAllWithImage`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  show(id: number): Observable<string> {
    return this.http.post(`${environment.apiUrl}/carrousel/show`, 'id=' + id, this.getOptionsFiles()).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  save(fichier: File): Observable<Fichier> {
    const url = `${environment.apiUrl}/carrousel/save`;
    return this.saveFile(url, fichier);
  }

  deleteImage(fichier: Fichier) {
    return this.http.post(`${environment.apiUrl}/carrousel/supprimer`, 'id=' + fichier.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
