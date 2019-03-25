import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs/index';
import {Service} from './service';
import {JobTitle} from '../app/domaine/jobTitle';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class JobTitleService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAllJobTitles(): Observable<JobTitle[]>  {
    return this.http.get<JobTitle[]>(`${environment.apiUrl}/jobTitle/getAllJobTitles`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

}
