import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../../services/estado';
import { Estado } from '../../interfaces/estado.interface';

@Component({
  selector: 'app-lista-estados',
  standalone: true,
  templateUrl: './lista-estados.html',
  styleUrls: ['./lista-estados.css']
})
export class ListaEstadosComponent implements OnInit {
  estados: Estado[] = [];

  constructor(private estadoService: EstadoService) {
  }

  ngOnInit() {
    this.estadoService.obtenerEstados().subscribe(estados => {
      this.estados = estados;
    });
  }

  crearNuevoEstado() {
    this.estadoService.crearEstado().subscribe(response => console.log('El estado se creó'));
  }

  actualizarEstado() {
    this.estadoService.actualizarEstado(1).subscribe(response => console.log(response));
  }

  eliminarEstado() {
    this.estadoService.eliminarEstado(8).subscribe(response => console.log('Se elimino sonorá'));
  }
}
