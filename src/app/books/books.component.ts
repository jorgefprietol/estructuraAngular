import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.services';
import { Books } from './books.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  booksData: Books[] = [];

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksData = this.booksService.obtenerLibros();
  }

}
