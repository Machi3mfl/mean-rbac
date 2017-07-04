import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable
export class AuthService{
  public token: string;

  constructor(private http: Http){
    //set token if saved in local storage
    let currenUser =  JSON.parse(localStorage.getItem('currentUser'));
    this.token = currenUser && currenUser.token
  }

  login(username: string, password: string): Observable<boolean>{
    return this.http.post('/api/auth', JSON.stringify( {username: username, password: password}))
      .map((response: Response)=>{
      //login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if(token) {
          //set token property
          this.token = token;
          //store username to keep login between browsers
          localStorage.setItem('currentUser',JSON.stringify({ username: username, password: password}));
          return true;
        }else {
          return false;
        }
    });
  }

  logout(): void {
    //clear token and remove to localstorage
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
