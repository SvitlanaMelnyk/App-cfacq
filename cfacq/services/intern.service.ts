import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Service} from './service';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';
import {Offer} from '../app/domaine/offer';

@Injectable({
  providedIn: 'root'
})
export class InternService extends Service {
  newInternFormUrl = `${environment.apiUrl}/intern/save`;

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  save(internForm): Observable<HttpResponse<boolean>> {
    console.log(internForm);
    return this.http.post<boolean>(this.newInternFormUrl, 'jsonInternForm=' + encodeURIComponent(JSON.stringify(internForm)), this.getOptions())
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
  hasFichierFormulaire() {
    return this.http.post(`${environment.apiUrl}/intern/hasFichierFormulaire`, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
