import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { BooksService } from './books.services';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: 'books-nuevo.component.html'
})

export class BooksNuevoComponent{
  selectAutor: string;
  selectAutorTexto: string;
  fechaPublicacion: string;
  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  constructor(private booksService: BooksService){}

  guardarLibro(form: NgForm) {
    this.booksService.guardarLibro({
      libroId: 1,
      descripcion: form.value.descripcion,
      titulo: form.value.titulo,
      autor: this.selectAutorTexto,
      precio: form.value.precio,
      fechaPublicacion: new Date(this.fechaPublicacion)
    });
  }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }
}
