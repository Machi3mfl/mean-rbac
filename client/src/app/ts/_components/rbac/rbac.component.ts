import { Component, OnInit } from '@angular/core';
import { RbacService } from '../../_services/rbac.service';

@Component({
  selector: 'rbac',
  templateUrl: './rbac.component.html',
  styleUrls: ['./rbac.component.css'],
  providers: [RbacService]
})
export class RbacComponent implements OnInit {
  constructor( private rbacService: RbacService) {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllRoles();
  }

  loadAllRoles(){
    this.rbacService.getAll().subscribe(
      roles => { console.log('respuesta rbac',roles) },
      error => { console.log('error', error) }
    )
  }

}
