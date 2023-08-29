import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  estadoUsuario: Boolean;
  usuarioSubscription: Subscription;
  constructor(private seguridadServicio: SeguridadService) { }
  ngOnDestroy(): void {
        this.usuarioSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadServicio.segurdiadCambio.subscribe(status => {
      this.estadoUsuario = status;
    });
  }

  onMenuCloseDispatch() {
    this.menuToggle.emit();
  }

  salirMenu() {
    this.onMenuCloseDispatch();
    this.seguridadServicio.salirSesion();
  }

}
