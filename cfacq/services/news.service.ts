import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, Subscriber} from 'rxjs/index';
import {Service} from './service';
import {Actualite} from '../app/domaine/actualite';
import {environment} from '../environments/environment';
import {JSOG} from '../jsog';
import {Fichier} from '../app/domaine/fichier';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService extends Service {
  news: Actualite[];

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  getAll(): Observable<Actualite[]>  {
    return this.http.get<Actualite[]>(`${environment.apiUrl}/actualite/getAll`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getThreeLastNews(): Observable<Actualite[]>  {
    return this.http.get<Actualite[]>(`${environment.apiUrl}/actualite/getThreeLast`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getNewsByCategory(category): Observable<Actualite[]>  {
    return this.http.get<Actualite[]>(`${environment.apiUrl}/actualite/getNewsByCategory?category=` + category)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getNewsById(id) {
    return this.http.get<Actualite>(`${environment.apiUrl}/actualite/getById` + '?id=' + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  deleteNews(news: Actualite) {
    return this.http.post(`${environment.apiUrl}/actualite/delete`, 'id=' + news.id, this.getOptions()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  save(news: Actualite, images: File[]): Observable<Fichier> {
    for (const f of news.images) {
      f.fileImage = undefined;
    }
    const url = `${environment.apiUrl}/actualite/save`;
    return this.saveFiles(url, images, JSOG.stringify(news));
  }

}
