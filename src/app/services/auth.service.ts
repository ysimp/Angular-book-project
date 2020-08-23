import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //Puisque les opérations de création, de connexion et de déconnexion sont asynchrones, c'est-à-dire qu'elles n'ont pas un résultat instantané, 
  //les méthodes que vous allez créer pour les gérer retourneront des Promise
  createNewUser(email: string, password: string){
    return new Promise(
      (resolve, reject) =>{
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
          () => {
            resolve();
          },

          (error) =>{
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve,reject) =>{
        firebase.auth().signInWithEmailAndPassword(email,password).then(
          () => {
            resolve();
          },
          (error) =>{
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
