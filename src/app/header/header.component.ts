import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth : boolean;

  constructor( private authService : AuthService) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged(
      //Si l'utilisateur est authentifié un objet user sera retouré
      (user) => {
        if(user){
          this.isAuth =true;
        }
        else{
          this.isAuth =false;
        }
      }
    );
  }

  onSignOut(){
    this.authService.signOutUser();
  }

}
