import { Subject } from 'rxjs';
import { Books } from './books.model';

export class BooksService{
  booksList: Books[] = [
    { 'libroId': 1, 'titulo': 'Algoritmos', 'descripcion': 'Libro Basico', 'autor': 'Jorge Prieto', 'precio': 18 },
    { 'libroId': 2, 'titulo': 'Angular', 'descripcion': 'Libro Intermedio', 'autor': 'Fidel Linares', 'precio': 25 },
    { 'libroId': 3, 'titulo': 'ASP.NET', 'descripcion': 'Master', 'autor': 'Pepe Lopez', 'precio': 30 },
    { 'libroId': 4, 'titulo': 'Java', 'descripcion': 'Agile Libro','autor': 'Jorge Linares','precio': 99}
  ];

  bookSubject = new Subject<Books>();

  obtenerLibros() {
    return this.booksList.slice();
  }

  guardarLibro(book: Books) {
    this.booksList.push(book);
    this.bookSubject.next(book);
  }
}
