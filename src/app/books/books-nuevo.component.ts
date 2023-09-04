import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { BooksService } from './books.services';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.services';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: 'books-nuevo.component.html'
})

export class BooksNuevoComponent implements OnInit{
  selectAutor: string;
  selectAutorTexto: string;
  fechaPublicacion: string;
  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
  autores: Autor[] = [];

  constructor(private booksService: BooksService, private dialogRef: MatDialog, private autoresService: AutoresService){}
  ngOnInit(): void {
    //this.autores = this.autoresService.obtenerAutores();
  }

  guardarLibro(form: NgForm) {
    if (form.valid) {
      this.booksService.guardarLibro({
        libroId: 1,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: this.selectAutorTexto,
        precio: form.value.precio,
        fechaPublicacion: new Date(this.fechaPublicacion)
      });
      this.dialogRef.closeAll();
    }

  }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }
}
