import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, Subscriber} from 'rxjs/index';
import {Service} from './service';
import {Media} from '../app/domaine/media';
import {environment} from '../environments/environment';
import {JSOG} from '../jsog';
import {Fichier} from '../app/domaine/fichier';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class MediaService extends Service {
  media: Media[];

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Media[]>  {

    return this.http.get<Media[]>(`${environment.apiUrl}/media/getAllMedia`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getThreeLastMedia(): Observable<Media[]> {
    return this.http.get<Media[]>(`${environment.apiUrl}/media/getThreeLastMedia`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  deleteMedia(media: Media) {
    return this.http.post(`${environment.apiUrl}/media/supprimer`, 'id=' + media.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  save(media: Media, image: File): Observable<Fichier> {
    const url = `${environment.apiUrl}/media/save`;
    return this.saveFile(url, image, JSOG.stringify(media));
  }
}
