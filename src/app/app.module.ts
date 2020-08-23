import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SiginComponent } from './auth/sigin/sigin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BooksService } from './services/books.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'

//Les routes
const appRoutes : Routes = [
  { path: 'auth/signup', component : SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'books', canActivate : [AuthGuardService], component: BookListComponent},
  { path: 'books-new', canActivate : [AuthGuardService], component: BookFormComponent},
  { path: 'books-view/:id', canActivate : [AuthGuardService], component: SingleBookComponent},
  { path: '', redirectTo: 'books', pathMatch :'full'},
  { path: '**', redirectTo: 'books',}
]


@NgModule({
  //Déclarer les components
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    SiginComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent
  ],
  //Ajouter les imports
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  //AJouter les services créer
  providers: [
    AuthService,
    AuthGuardService,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
