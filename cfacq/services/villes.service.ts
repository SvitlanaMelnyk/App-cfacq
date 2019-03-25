import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Service} from './service';
import {Ville} from '../app/domaine/ville';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class VillesService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Ville[]> {
    return this.http.get<Ville[]>(`${environment.apiUrl}/ville/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getAllForCv(): Observable<Ville[]> {
    return this.http.get<Ville[]>(`${environment.apiUrl}/ville/getAllForCv`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
}
