import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: 'books-nuevo.component.html'
})

export class BooksNuevoComponent{
  selectAutor: string;

  guardarLibro(form: NgForm) {

  }
}
