import { Subject } from 'rxjs';
import { Books } from './books.model';
import { environment } from 'src/environments/environment';
import { PaginationBooks } from './pagination-books.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService{
/*   booksList: Books[] = [
    { 'libroId': 1, 'titulo': 'Algoritmos', 'descripcion': 'Libro Basico', 'autor': 'Jorge Prieto', 'precio': 18 },
    { 'libroId': 2, 'titulo': 'Angular', 'descripcion': 'Libro Intermedio', 'autor': 'Fidel Linares', 'precio': 25 },
    { 'libroId': 3, 'titulo': 'ASP.NET', 'descripcion': 'Master', 'autor': 'Pepe Lopez', 'precio': 30 },
    { 'libroId': 4, 'titulo': 'Java', 'descripcion': 'Agile Libro','autor': 'Jorge Linares','precio': 99}
  ]; */
  baseUrl = environment.baseUrl;
  booksList: Books[] = [];
  //bookSubject = new Subject<Books>();
  bookSubject = new Subject();
  bookPagination: PaginationBooks;
  bookPaginationSubject = new Subject<PaginationBooks>();

  constructor(private http: HttpClient){}

  obtenerLibros(libroPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) {
    //return this.booksList.slice();
    const request = {
      pageSize: libroPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    };
    this.http.post<PaginationBooks>(this.baseUrl + 'libro/pagination', request)
      .subscribe((response) => {
        this.bookPagination = response;
        this.bookPaginationSubject.next(this.bookPagination);
      });
  }
    obtenerLibrosFilter(libroPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) {
    //return this.booksList.slice();
    const request = {
      pageSize: libroPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    };
    this.http.post<PaginationBooks>(this.baseUrl + 'libro/paginationFilter', request)
      .subscribe((response) => {
        this.bookPagination = response;
        this.bookPaginationSubject.next(this.bookPagination);
      });
  }

  obtenerActualListener(): any {
    return this.bookPaginationSubject.asObservable();
  }

  guardarLibro(book: Books): void {
    //this.booksList.push(book);
    this.http.post(this.baseUrl + '/libro', book)
      .subscribe((response) => {
      this.bookSubject.next();
      });
  }

  guardarLibroListener() {
    return this.bookSubject.asObservable();
  }

}
