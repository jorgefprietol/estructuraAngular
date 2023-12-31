import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { BooksService } from './books.services';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: 'books-nuevo.component.html'
})

export class BooksNuevoComponent implements OnInit, OnDestroy{
  selectAutor: string;
  selectAutorTexto: string;
  fechaPublicacion: string;
  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
  autores: Autor[] = [];
  autorSubcription: Subscription;

  constructor(private booksService: BooksService, private dialogRef: MatDialog, private autoresService: AutoresService){}

  ngOnInit(): void {
    //this.autores = this.autoresService.obtenerAutores();
    this.autoresService.obtenerAutores();
    this.autorSubcription = this.autoresService.obtenerActualListener()
      .subscribe((autoresBackend: Autor[]) => {
        this.autores = autoresBackend;
      });
  }

  guardarLibro(form: NgForm) {
    if (form.valid) {
      const autorRequest = {
        id: this.selectAutor,
        nombreCompleto: this.selectAutorTexto
      };

      const libroRequest = {
        id: null,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        precio: parseInt(form.value.precio),
        fechaPublicacion: new Date(this.fechaPublicacion)
      }

/*       this.booksService.guardarLibro({
        id: 1,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        precio: form.value.precio,
        fechaPublicacion: new Date(this.fechaPublicacion)
      }); */

      this.booksService.guardarLibro(libroRequest);
      this.autorSubcription = this.booksService.guardarLibroListener()
        .subscribe(() => {
          this.dialogRef.closeAll();
        });

    }

  }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }

  ngOnDestroy(): void {
    this.autorSubcription.unsubscribe();
  }
}
