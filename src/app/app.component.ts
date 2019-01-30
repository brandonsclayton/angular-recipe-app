import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-recipe-app';

  apiKey = 'AIzaSyBJw_lET8lZakAgA3kjJ8Y60Z76N8ycHjo';
  authDomain = 'udemy-ng-recipe-app-a0795.firebaseapp.com';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: this.apiKey,
      authDomain: this.authDomain,
    });
  }

}
