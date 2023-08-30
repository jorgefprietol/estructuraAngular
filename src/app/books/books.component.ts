import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.services';
import { Books } from './books.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  booksData: Books[] = [];
  displayedColumns: string[] = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    //this.booksData = this.booksService.obtenerLibros();
    this.dataSource.data = this.booksService.obtenerLibros();
  }
}
