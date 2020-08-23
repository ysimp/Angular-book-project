import { Injectable } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] =[];
  booksSubject = new Subject<Book[]>();

  constructor() { this.getBooks();}

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  //Permet d'enregistrer le tableau de book sur fireBase
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  //Recuperer la liste des books enregistrer sur le server
  getBooks() {
    firebase.database().ref('/books').on('value', (data : DataSnapshot) =>{
      this.books = data.val() ? data.val() : [] ;
      this.emitBooks();
    });
    
  }

  //Recuperer un seul book sur le serve
  getSingleBook(id: number) {
    return new Promise(
      (resolve,reject) => {
        firebase.database().ref('/books/'+ id).once('value').then(
          (data : DataSnapshot) =>{
          resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  //Creation d'un nouveau livre
  createNewBook(newbook : Book){
    this.books.push(newbook);
    this.saveBooks();
    this.emitBooks();
  }

  //Suppression  d'un livre
  removeBook(book : Book){

    if(book.photo){
      const storageRef= firebase.storage().refFromURL(book.photo);

      storageRef.delete().then(
        ()=>{
          console.log('Photo removed');
        },

        (error) =>{
          console.log('Could not remove  photo !' +error);
        }
      )
    }

    const bookIndexToRemove = this.books.findIndex(
      (bookEl) =>{
       if(bookEl === book){
         return true;
       }
      }
    );

      //Slice prend l'index à supprimer et le nombre d'element
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  //Charger une photo sur le server firebase
  //Méthodes Asynchrone car le chargement prend du temps
  uploadFile(file : File){
    return new Promise(
      (resolve,reject)=>{

        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref().child(
          '/images'+ almostUniqueFileName +file.name).put(file);

          //Suivi de l'etat 
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            //Envoie des données sur le server
            () => {
              console.log('Chargement...');
            },
            // Si le server renvoie une error
            (error) =>{
              console.log('Erreur de chargement !'+ error);
              reject();
            },
            //Complete : lorsque le chargement est terminé on renvoie l'url du fichier
            ()=>{
              console.log('Chargement terminé');
              resolve(upload.snapshot.ref.getDownloadURL());
            }
            );

      }
    );
  }
    
}
