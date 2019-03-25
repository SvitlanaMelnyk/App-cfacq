import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs/index';
import {Service} from './service';
import {JSOG} from '../jsog';
import {Event} from '../app/domaine/event';
import {Ville} from '../app/domaine/ville';
import {Util} from '../util/util';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class EventService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(dateStart: Date, dateEnd: Date, ville: Ville): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiUrl}/event/getAll` + '?dateStart=' + Util.getDateString(dateStart) + '&dateEnd=' + Util.getDateString(dateEnd) + '&city=' + JSOG.stringify(ville || null))
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  save(event: Event): Observable<Event> {
    console.log(event);
    return this.http.post(`${environment.apiUrl}/event/save`, 'json=' + JSOG.stringify(event), this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  deleteEvent(event: Event) {
    return this.http.post(`${environment.apiUrl}/event/supprimer`, 'id=' + event.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

}
