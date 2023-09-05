import { Subscription } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BooksService } from './books.services';
import { Books } from './books.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BooksNuevoComponent } from './books-nuevo.component';
import { PaginationBooks } from './pagination-books.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {

  booksData: Books[] = [];
  displayedColumns: string[] = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  private bookSubscription: Subscription;
  totalLibros = 0;
  librosPorPagina = 2;
  paginaCombo = [1, 2, 5, 10];
  paginaActual = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue = null;
  constructor(private booksService: BooksService, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

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
/*     this.dataSource.data = this.booksService.obtenerLibros();
    this.bookSubscription = this.booksService.bookSubject.subscribe(() => {
      this.dataSource.data = this.booksService.obtenerLibros();
    }) */
    this.booksService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
    this.booksService
        .obtenerActualListener()
        .subscribe((pagination: PaginationBooks) => {
          this.dataSource = new MatTableDataSource<Books>(pagination.data);
          this.totalLibros = pagination.totalRows;
          console.log("totalLibros:", pagination);
        });

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  eventoPaginador(event: PageEvent) {
    this.librosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.booksService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

}
