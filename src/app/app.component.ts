import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 constructor(){

  var firebaseConfig = {
    apiKey: "AIzaSyDiKltkWvTAl5SBcUGBT24ZCusuvIB1wAY",
    authDomain: "bookproject-f15fa.firebaseapp.com",
    databaseURL: "https://bookproject-f15fa.firebaseio.com",
    projectId: "bookproject-f15fa",
    storageBucket: "bookproject-f15fa.appspot.com",
    messagingSenderId: "472861760787",
    appId: "1:472861760787:web:7b299cd760839e54a10ee6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 }
}
