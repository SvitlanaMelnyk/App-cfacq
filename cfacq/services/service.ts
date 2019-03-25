import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs/index';
import {JSOG} from '../jsog';
import {Observable, Subscriber} from 'rxjs';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(protected authenticationService: AuthenticationService) {

  }

  public extractData(res: any) {
    let body: any = null;
    if (res !== 'false') {
      body = JSOG.decode(res);
    }
    if (res === 'false') { // cas ou le serveur retourne false si serveur retourne boolean
      return body;
    } else {
      return body || {};
    }
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  public getOptions() {
    const headers = new HttpHeaders({'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'});
    return {headers: headers};
  }

  public getOptionsFiles() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'});
    return {headers: headers, responseType: 'text' as 'text'};
  }

  public saveFile(url: string, file: File, json?: string) {
    return Observable.create((observer: Subscriber<any>) => {
      const formData: FormData = new FormData(), xhr: XMLHttpRequest = new XMLHttpRequest();
      const currentUser = this.authenticationService.currentUserValue;
      if (file) {
        formData.append('file', file, file.name);
      }

      if (json) {
        formData.append('json', json);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSOG.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      if (currentUser) {
        xhr.setRequestHeader('Authorization', currentUser.token);
      }
      xhr.send(formData);
    });
  }

  public saveFiles(url: string, files: File[], json?: string) {
    return Observable.create((observer: Subscriber<any>) => {
      const formData: FormData = new FormData(), xhr: XMLHttpRequest = new XMLHttpRequest();
      const currentUser = this.authenticationService.currentUserValue;
      if (files) {
        files.forEach(f => {
          if (f) {
            formData.append('file', f, f.name);
          }
        });
      }

      if (json) {
        formData.append('json', json);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSOG.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', currentUser.token);
      xhr.send(formData);
    });
  }
}
