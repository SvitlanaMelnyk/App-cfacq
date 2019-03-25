import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs/index';
import {Service} from './service';
import {CategoriePoste} from '../app/domaine/categoriePoste';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class CategoriePostesService extends Service {
  categoriePosteList = [
    'Administratif',
    'Magasin',
    'Centre de distribution'
  ];

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getCategoriePostes(): Observable<CategoriePoste[]> {
    return this.http.get<CategoriePoste[]>(`${environment.apiUrl}/categoriePoste/getAllCategoriePoste`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
}
