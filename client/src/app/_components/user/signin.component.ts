import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../_services/user.service';

@Component({
  moduleId: module.id,
  templateUrl: 'signin.component.html'
})

export class SignInComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private UserService: UserService
  ) {}

  ngOnInit() {
  }

  addUser() {
    this.loading = true;
    this.UserService.addUser(this.model.username, this.model.password)
      .subscribe( result => {
        //this.router.navigate(['/']);
        this.loading = false;
      });
  }


}
