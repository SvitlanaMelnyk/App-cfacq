import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs/index';
import {Service} from './service';
import {Cv} from '../app/domaine/cv';
import {JSOG} from '../jsog';
import {Ville} from '../app/domaine/ville';
import {TypePoste} from '../app/domaine/typePoste';
import {CategoriePoste} from '../app/domaine/categoriePoste';
import {Offer} from '../app/domaine/offer';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  searchPosteEtudiant(villes: Ville[], typePostes: TypePoste[], categoriePostes: CategoriePoste): Observable<Cv[]>  {
    console.log(villes, typePostes, categoriePostes);

    const v = {villes: villes};
    const t = {typePostes: typePostes};
    const c = {categoriePostes: categoriePostes};

    return this.http.get<Cv[]>(`${environment.apiUrl}/cv/filterCV` + '?city=' + JSOG.stringify(v) + '&typePost=' + JSOG.stringify(t) + '&categoryPost=' + JSOG.stringify(c))
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  searchPosteEmployeur(villes: Ville[], typePostes: TypePoste[], categoriePostes: CategoriePoste): Observable<Offer[]>  {
    console.log(villes, typePostes, categoriePostes);

    const v = {villes: villes};
    const t = {typePostes: typePostes};
    const c = {categoriePostes: categoriePostes};
    return this.http.get<Offer[]>(`${environment.apiUrl}/offer/filterOffer` + '?city=' + JSOG.stringify(v) + '&typePost=' + JSOG.stringify(t) + '&categoryPost=' + JSOG.stringify(c))
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
}
