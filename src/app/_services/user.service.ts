import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  login(userInfo):  Observable<any> {
    return this.http.post(endpoint + 'login', JSON.stringify(userInfo), httpOptions).pipe(
      catchError(this.handleError<any>('login'))
    )
  }

  register(userInfo):  Observable<any> {
    return this.http.post<any>(endpoint + 'register', JSON.stringify(userInfo), httpOptions);
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(endpoint + 'details', tokenHeader);
  }

  isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  logout(){
    return this.http.post<any>(endpoint + 'logout', '', tokenHeader);
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

const api_token = localStorage.getItem('ACCESS_TOKEN');
const endpoint = 'http://blog.lr/api/'; 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const tokenHeader = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization' : 'Bearer '+api_token
  })
}