import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {UsuarioComponent} from './usuario.component';
import { FormsModule } from '@angular/forms';
import { LibroComponent } from './libro/libro/libro.component';
import { LibrosComponent } from './libros/libros/libros.component';
import { LibrosService } from './services/libros.service';
import {InicioComponent } from './inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarraComponent } from './navegacion/barra/barra.component';
import { MenuListaComponent } from './navegacion/menu-lista/menu-lista.component';
import { SeguridadService } from './seguridad/seguridad.service';
import { BooksComponent } from './books/books.component';
import { BooksService } from './books/books.services';
import { BooksNuevoComponent } from './books/books-nuevo.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AutoresComponent } from './autores/autores.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {SeguridadInterceptor} from './seguridad/seguridad-interceptor'

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LibroComponent,
    LibrosComponent,
    InicioComponent,
    RegistrarComponent,
    LoginComponent,
    BarraComponent,
    MenuListaComponent,
    BooksComponent,
    BooksNuevoComponent,
    AutoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: SeguridadInterceptor, multi: true}, LibrosService, {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
  bootstrap: [AppComponent],
  entryComponents: [BooksNuevoComponent]
})
export class AppModule { }
