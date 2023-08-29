import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';

export class SeguridadService{
  private usuario: Usuario;

  registrarUsuario(usr: Usuario) {
    this.usuario = {
      email: usr.email,
      password: usr.password,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellidos: usr.apellidos,
      username: usr.username
    };
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
  }

  salirSesion() {
    this.usuario = null;
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }
}
