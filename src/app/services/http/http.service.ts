import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(body: any, url) {
    //creat HTTP headers which allow the client and the server to pass additional information with the request or the response.
    console.log("3");
    return this.http.post(url, body, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
  }

  userPost(url, token: string, body: any = null) {
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'token': token
      })
    })
  }

  userPut(url, token: string, body: any = null) {
    return this.http.put(url, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'token': token
      })
    })
  }

  imgPost(url, token: string, body: any) {
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'token': token
      })
    })
  }
}
