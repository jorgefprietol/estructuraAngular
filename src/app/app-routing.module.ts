import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { LibrosComponent } from './libros/libros/libros.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { UsuarioComponent } from './usuario.component';
import { SeguridadRouter } from './seguridad/seguridad.router';
import { BooksComponent } from './books/books.component';
import { AutoresComponent } from './autores/autores.component';

const routes: Routes = [
  { path:'', component: InicioComponent, canActivate: [SeguridadRouter]},
  { path: 'libros', component: LibrosComponent, canActivate: [SeguridadRouter] },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'usuario', component: UsuarioComponent, canActivate: [SeguridadRouter] },
  { path: 'books', component: BooksComponent, canActivate: [SeguridadRouter] },
  { path: 'autores', component: AutoresComponent, canActivate: [SeguridadRouter] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SeguridadRouter]
})
export class AppRoutingModule { }
