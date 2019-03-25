import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Service} from './service';
import {Offer} from '../app/domaine/offer';
import {JSOG} from '../jsog';
import {environment} from '../environments/environment';
import {Subscriber} from 'rxjs';
import {Fichier} from '../app/domaine/fichier';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class OfferService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${environment.apiUrl}/offer/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getAllPublished(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${environment.apiUrl}/offer/getAllPublished`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getById(id) {
    return this.http.get<Offer>(`${environment.apiUrl}/offer/getById` + '?id=' + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  save(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${environment.apiUrl}/offer/save`, 'jsonOffer=' + encodeURIComponent(JSOG.stringify(offer)), this.getOptions())
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  deleteOffer(offer: Offer) {
    return this.http.post(`${environment.apiUrl}/offer/supprimer`, 'id=' + offer.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  togglePublished(offer: Offer) {
    return this.http.post(`${environment.apiUrl}/offer/togglePublished`, 'id=' + offer.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  deleteFichier() {
    return this.http.post(`${environment.apiUrl}/intern/deleteFormulaireFichier`, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getFichier() {
    return this.http.get(`${environment.apiUrl}/intern/getFichierFormulaire`, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  uploadFichier(fichier: File): Observable<Fichier> {
    return Observable.create((observer: Subscriber<any>) => {
      const currentUser = this.authenticationService.currentUserValue;
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append('file', fichier, fichier.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSOG.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', `${environment.apiUrl}/intern/saveFormulaireFichier`, true);
      xhr.setRequestHeader('Authorization', currentUser.token);
      xhr.send(formData);
    });
  }

}
