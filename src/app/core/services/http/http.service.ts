import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    if (refreshToken) {
      headers = headers.set('x-refresh-token', refreshToken);
    }
    return headers;
  }

  refreshToken(): Observable<string> {
    return this.http.post<{ accessToken: string }>(`${environment.apiUrl}refresh-token`, {
      token: localStorage.getItem('refreshToken')
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.accessToken);
      }),
      map(response => response.accessToken)
    );
  }

  private handleAuthError(error: HttpErrorResponse, requestFn: () => Observable<any>): Observable<any> {
    if (error.status === 403 && error.error.message === "Invalid access token") {
      return this.refreshToken().pipe(
        switchMap(() => requestFn())
      );
    }
    return throwError(() => error);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(url, body, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
      .pipe(catchError(error => this.handleAuthError(error, () => this.userPost(url, body))));
  }

  userGet(url: string): Observable<any> {
    return this.http.get(url, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handleAuthError(error, () => this.userGet(url))));
  }

  userPost(url: string, body: any): Observable<any> {
    return this.http.post(url, body, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handleAuthError(error, () => this.userPost(url, body))));
  }

  userDelete(url: string, body: any = null): Observable<any> {
    return this.http.delete(url, { headers: this.getHeaders(), body })
      .pipe(catchError(error => this.handleAuthError(error, () => this.userDelete(url, body))));
  }

  userPut(url: string, body: any = null): Observable<any> {
    return this.http.put(url, body, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handleAuthError(error, () => this.userPut(url, body))));
  }

  imgPost(url: string, body: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(url, body, { headers: new HttpHeaders({ 'authorization': `Bearer ${token}` }) })
      .pipe(catchError(error => this.handleAuthError(error, () => this.imgPost(url, body))));
  }
}
