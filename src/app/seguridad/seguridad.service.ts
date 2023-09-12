import { Subject, Subscriber } from 'rxjs';
import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  })
export class SeguridadService{
  baseUrl = environment.baseUrl;

  private usuario: Usuario;
  segurdiadCambio = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) {

  }

  registrarUsuario(usr: Usuario) {
     this.usuario = {
      email: usr.email,
      password: usr.password,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellidos: usr.apellidos,
      username: usr.username
    };
    this.segurdiadCambio.next(true);
    this.router.navigate(['/']);

  }

  login(loginData: LoginData) {

/*     this.usuario = {
      email: loginData.email,
      password: loginData.password,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: '',
      apellidos: '',
      username: ''
    };
    this.segurdiadCambio.next(true);
    this.router.navigate(['/']); */
    this.http.post(this.baseUrl + 'usuario/login', loginData)
     .subscribe((response) => {
      console.log('login respuesta', response);
    });
  }

  salirSesion() {
    this.usuario = null;
    this.segurdiadCambio.next(false);
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  onSesion() {
    return this.usuario != null;
  }
}
