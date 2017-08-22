import { Component, OnInit } from '@angular/core';
import { RbacService, AlertService } from '../../_services/index';

@Component({
  selector: 'rbac',
  templateUrl: './rbac.component.html',
  styleUrls: ['./rbac.component.css'],
  providers: [RbacService]
})
export class RbacComponent implements OnInit {

  roles;
  hasRoles: boolean = false;

  constructor( private rbacService: RbacService,
               private alertService: AlertService ) {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllRoles();
  }

  private loadAllRoles(){
    this.rbacService.getAll().subscribe(
      roles => {
        if (roles){
          this.roles = roles;
          this.hasRoles = true;
        }
        else{
          this.hasRoles = false;
        }
      },
      error => { console.log('error', error) }
    )
  }

  private removeRole(_id: string){
    this.rbacService.remove(_id).subscribe(
      data => {
        this.alertService.success('Role Removed Succesfully', true)
        this.loadAllRoles()
      },
      error =>{

      })
  }

}
