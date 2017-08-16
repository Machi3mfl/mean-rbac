import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()

export class RbacService {
  constructor(private http: Http) { }

  getAll(){
    return this.http.get('/rbac').map(
      (response: Response) => response.json()
    );
  }
}

