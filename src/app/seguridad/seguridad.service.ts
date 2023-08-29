import { Subject } from 'rxjs';
import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SeguridadService{
  private usuario: Usuario;
  segurdiadCambio = new Subject<boolean>();

  constructor(private router: Router) {

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

    this.usuario = {
      email: loginData.email,
      password: loginData.password,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: '',
      apellidos: '',
      username: ''
    };
    this.segurdiadCambio.next(true);
    this.router.navigate(['/']);
  }

  salirSesion() {
    this.usuario = null;
    this.segurdiadCambio.next(false);
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }
}
