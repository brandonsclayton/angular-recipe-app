import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { FirebaseService } from '../../shared/firebase.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();


  constructor(
      private firebaseService: FirebaseService,
      private authService: AuthService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.firebaseService.saveRecipes().subscribe((response: Response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  onFetchData() {
    this.firebaseService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuth() {
    return this.authService.isAuth();
  }

}
