import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs';
import {Service} from './service';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationService extends Service {
  newStudentRegistrationUrl = `${environment.apiUrl}/registration/save`;


  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  registerStudent(registration): Observable<HttpResponse<boolean>> {
    console.log(registration);
    return this.http.post<boolean>(this.newStudentRegistrationUrl,  'jsonRegistration=' + encodeURIComponent(JSON.stringify(registration)), this.getOptions())
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
}

