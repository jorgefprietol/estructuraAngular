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
  private token: string;
  private usuario: Usuario;
  segurdiadCambio = new Subject<boolean>();

  cargarUsuario():void {
    const tokenBrowser = localStorage.getItem('token');
    if (!tokenBrowser) {
      return;
    }

    this.token = tokenBrowser;
    this.segurdiadCambio.next(true);
    this.http.get<Usuario>(this.baseUrl + 'usuario')
     .subscribe((response) => {
       console.log('login respuesta', response);
       this.token = response.token;
       this.usuario = {
         email: response.email,
         nombre: response.nombre,
         apellidos: response.apellidos,
         token: response.token,
         password: '',
         username: response.username,
         usuarioId: response.usuarioId
       };
       this.segurdiadCambio.next(true);
       localStorage.setItem('token', response.token);
    });
  }

  obtenerToken(): string {
    return this.token;
  }

  constructor(private router: Router, private http: HttpClient) {

  }

  registrarUsuario(usr: Usuario) {
     this.usuario = {
      email: usr.email,
      password: usr.password,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellidos: usr.apellidos,
       username: usr.username,
      token: usr.token,
    };
    this.segurdiadCambio.next(true);
    this.router.navigate(['/']);

  }

  login(loginData: LoginData): void {

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
    this.http.post<Usuario>(this.baseUrl + 'usuario/login', loginData)
     .subscribe((response) => {
       console.log('login respuesta', response);
       this.token = response.token;
       this.usuario = {
         email: response.email,
         nombre: response.nombre,
         apellidos: response.apellidos,
         token: response.token,
         password: '',
         username: response.username,
         usuarioId: response.usuarioId
       };
       this.segurdiadCambio.next(true);
       localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    });
  }

  salirSesion() {
    this.usuario = null;
    this.segurdiadCambio.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  onSesion() {
    return this.token != null;
  }
}
