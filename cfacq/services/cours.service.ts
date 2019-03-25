import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs/index';
import {Service} from './service';
import {environment} from '../environments/environment';
import {Cours} from '../app/domaine/cours';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class CoursService extends Service {
  formations = [
    {id: 0, name: 'formation 1'},
    {id: 1, name: 'formation 2'},
    {id: 2, name: 'formation 3'}
  ];

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Cours[]>  {
    return this.http.get<Cours[]>(`${environment.apiCFACQUrl}/cours/getListeSiteWeb`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

}
