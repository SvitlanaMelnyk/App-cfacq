import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs/index';
import {Service} from './service';
import {TypePoste} from '../app/domaine/typePoste';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';



@Injectable({
  providedIn: 'root'
})
export class TypePostesService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getTypePostes(): Observable<TypePoste[]>  {
    return this.http.get<TypePoste[]>(`${environment.apiUrl}/TypePoste/getAllTypePoste`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
}
