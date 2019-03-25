import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Service} from './service';
import {JSOG} from '../jsog';
import {environment} from '../environments/environment';
import {Salle} from '../app/domaine/salle';
import {AuthenticationService} from './authentication.service';
import {User} from '../app/domaine/user';
import {Role} from '../app/domaine/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.apiUrl}/role/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

}
