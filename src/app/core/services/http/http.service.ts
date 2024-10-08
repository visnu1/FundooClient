import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  post(body: any, url) {
    //creat HTTP headers which allow the client and the server to pass additional information with the request or the response.
    return this.http.post(url, body, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
  }

  userPost(url: string, token: string, body: any = null): Observable<any> {
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      })
    })
  }

  userDelete(url: string, token: string, body: any = null) {
    return this.http.delete(url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      }),
      body
    });
  }


  userPut(url, token: string, body: any = null) {
    return this.http.put(url, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      })
    })
  }

  imgPost(url, token: string, body: any) {
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    })
  }
}
