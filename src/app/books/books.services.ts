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
  bookSubject = new Subject<Books>();
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
    this.http.post<PaginationBooks>(this.baseUrl + 'api/Libro/Pagination', request)
      .subscribe((response) => {
        this.bookPagination = response;
        this.bookPaginationSubject.next(this.bookPagination);
      });
  }

  obtenerActualListener() {
    return this.bookPaginationSubject.asObservable();
  }

  guardarLibro(book: Books) {
    this.booksList.push(book);
    this.bookSubject.next(book);
  }
}
