import { Component, OnInit } from '@angular/core';
import {current} from "codelyzer/util/syntaxKind";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log('current',currentUser.firstName)
  }

  ngOnInit() {

  }

}
