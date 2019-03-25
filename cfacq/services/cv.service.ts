import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs/index';
import {Service} from './service';
import {Cv} from '../app/domaine/cv';
import {environment} from '../environments/environment';
import {Offer} from '../app/domaine/offer';
import {CvFichier} from '../app/domaine/cvFichier';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class CvService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Cv[]> {
    return this.http.get<Cv[]>(`${environment.apiUrl}/cv/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getAllPublished(): Observable<Cv[]> {
    return this.http.get<Cv[]>(`${environment.apiUrl}/cv/getAllPublished`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getAllFichiers(): Observable<CvFichier[]> {
    return this.http.get<CvFichier[]>(`${environment.apiUrl}/cv/getAllCVFichier`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getById(id) {
    return this.http.get<Cv>(`${environment.apiUrl}/cv/getCvById` + '?id=' + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  save(cv: Cv): Observable<Cv> {
    return this.http.post<boolean>(`${environment.apiUrl}/cv/save`, 'json=' + encodeURIComponent(JSON.stringify(cv)), this.getOptions())
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  deleteCv(cv: Cv) {
    return this.http.post(`${environment.apiUrl}/cv/supprimer`, 'id=' + cv.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  deleteCvFichier(cv: CvFichier) {
    return this.http.post(`${environment.apiUrl}/cv/supprimerFichier`, 'id=' + cv.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  togglePublished(cv: Cv) {
    return this.http.post(`${environment.apiUrl}/cv/togglePublished`, 'id=' + cv.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
