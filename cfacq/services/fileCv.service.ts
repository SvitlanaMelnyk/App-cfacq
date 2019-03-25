import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of, Subscriber} from 'rxjs';
import {Service} from './service';
import {environment} from '../environments/environment';
import {JSOG} from '../jsog';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FileCvService extends Service {

  constructor(private http: HttpClient, protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  uploadCV(fileCv: File): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}/cv/post`;
    return this.saveFile(url, fileCv);
  }
}

