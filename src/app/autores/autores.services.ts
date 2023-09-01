import { Autor } from './autor.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoresService{
  private autoresList: Autor[] = [
    { autorId: 1, nombre: 'Jorge', apellido: 'Prieto', gradoAcademico: 'Ingeniero' },
    { autorId: 2, nombre: 'Jorge2', apellido: 'Prieto2', gradoAcademico: 'Ingeniero2' },
    { autorId: 3, nombre: 'Jorge3', apellido: 'Prieto3', gradoAcademico: 'Ingeniero3' },
    { autorId: 4, nombre: 'Jorge4', apellido: 'Prieto4', gradoAcademico: 'Ingeniero4' }
  ];

  obtenerAutores() {
    return this.autoresList.slice();
  }
}
