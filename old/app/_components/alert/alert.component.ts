import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../_services/index';

@Component({
  moduleId: module.id,
  selector: 'alert',
  templateUrl: 'alert.directive.html'
})

export class AlertService {
  message: any;

  constructor( private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe( message => { this.message = message });
  }
}
