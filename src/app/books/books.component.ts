import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from './books.services';
import { Books } from './books.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BooksNuevoComponent } from './books-nuevo.component';

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
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  constructor(private booksService: BooksService, private dialog: MatDialog) { }

  hacerFiltro(filtro: string) {
    this.dataSource.filter = filtro;
  }

  abrirDialog() {
    this.dialog.open(BooksNuevoComponent, {
      width: '450px'
    });
  }

  ngOnInit(): void {
    //this.booksData = this.booksService.obtenerLibros();
    this.dataSource.data = this.booksService.obtenerLibros();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

}
