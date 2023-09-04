import { Component, OnInit } from '@angular/core';
import { Autor } from './autor.model';
import { MatTableDataSource } from '@angular/material/table';
import { AutoresService } from './autores.services';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();
  constructor(private autoresService: AutoresService) { }

  ngOnInit(): void {
    this.autoresService.obtenerAutores();
    this.autoresService.obtenerActualListener()
      .subscribe((autores: Autor[]) => {
        this.dataSource.data = autores;
      });
    //this.dataSource.data = this.autoresService.obtenerAutores();
  }

}
