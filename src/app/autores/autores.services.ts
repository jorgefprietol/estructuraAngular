import { environment } from 'src/environments/environment';
import { Autor } from './autor.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoresService{
/*   private autoresList: Autor[] = [
    { autorId: 1, nombre: 'Jorge', apellido: 'Prieto', gradoAcademico: 'Ingeniero' },
    { autorId: 2, nombre: 'Jorge2', apellido: 'Prieto2', gradoAcademico: 'Ingeniero2' },
    { autorId: 3, nombre: 'Jorge3', apellido: 'Prieto3', gradoAcademico: 'Ingeniero3' },
    { autorId: 4, nombre: 'Jorge4', apellido: 'Prieto4', gradoAcademico: 'Ingeniero4' }
  ]; */
  baseUrl = environment.baseUrl;
  private autoresList: Autor[] = [];
  private autoresSubject = new Subject<Autor[]>();

  constructor(private http: HttpClient) { }

  obtenerAutores() {
    this.http.get<Autor[]>(this.baseUrl + "autor")
      .subscribe((data) => {
        this.autoresList = data;
        this.autoresSubject.next([...this.autoresList]);
      });

    //return this.autoresList.slice();
  }

  obtenerActualListener() {
    return this.autoresSubject.asObservable();
  }

}
