import { Component, OnDestroy, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit, OnDestroy {
  //libros = ['Matematicas', 'Fisica', 'Quimica'];
  libros = [];
  constructor(private librosService: LibrosService) {}
  private libroSubscription: Subscription;

  eliminarLibro(libro){
    //this.libros = this.libros.filter(p => p != libro);
  }
  guardarLibro(f){
    //console.log('objeto formulario', f);
    if(f.valid){
      //this.libros.push(f.value.libroNombre);
      this.librosService.agregarLibro(f.value.libroNombre);
    }
  }

  ngOnInit(): void {
    this.libros = this.librosService.obtenerLibros();
    this.libroSubscription = this.librosService.librosSubject.subscribe( () => {
      this.libros = this.librosService.obtenerLibros();
    });
  }

  ngOnDestroy(): void {
      this.libroSubscription.unsubscribe();
  }

}
