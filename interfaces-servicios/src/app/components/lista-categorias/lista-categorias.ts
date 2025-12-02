import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-lista-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-categorias.html',
  styleUrls: ['./lista-categorias.css']
})
export class ListaCategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  cargando: boolean = true;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.cargando = false;
      }
    });
  }
}
