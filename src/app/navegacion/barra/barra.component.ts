import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  estadoUsuario: Boolean;
  usuarioSubscription: Subscription;
  constructor(private seguridadServicio: SeguridadService) {

  }
  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadServicio.segurdiadCambio.subscribe(status => {
      this.estadoUsuario = status;
    });
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  salir() {
    this.seguridadServicio.salirSesion();
  }

}
