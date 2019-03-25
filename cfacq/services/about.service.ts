import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs/index';
import {Service} from './service';
import {AboutUs} from '../app/domaine/aboutUs';
import {environment} from '../environments/environment';
import {JSOG} from '../jsog';
import {AuthenticationService} from './authentication.service';
import {Media} from '../app/domaine/media';
import {Fichier} from '../app/domaine/fichier';


@Injectable({
  providedIn: 'root'
})
export class AboutService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll() {
    return this.http.get<AboutUs[]>(`${environment.apiUrl}/aboutUs/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  save(aboutUs: AboutUs, image: File): Observable<HttpResponse<boolean>> {
      const url = `${environment.apiUrl}/aboutUs/save`;
    return this.saveFile(url, image, JSOG.stringify(aboutUs));
  }

  deleteAboutUs(aboutUs: AboutUs) {
    return this.http.post(`${environment.apiUrl}/aboutUs/supprimer`, 'id=' + aboutUs.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

}
