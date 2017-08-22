import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()

export class RbacService {
  constructor(private http: Http) { }

  getAll(){
    return this.http.get('/acl/roles').map(
      (response: Response) => response.json()
    );
  }

  remove(_id: string){
    return this.http.delete('/users/' + _id);
  }
}

