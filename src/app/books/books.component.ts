import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from './books.services';
import { Books } from './books.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit {

  booksData: Books[] = [];
  displayedColumns: string[] = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) ordenamiento: MatSort;
  constructor(private booksService: BooksService) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
  }

  ngOnInit(): void {
    //this.booksData = this.booksService.obtenerLibros();
    this.dataSource.data = this.booksService.obtenerLibros();
  }
}
