import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoticiaService } from '../../services/noticia';
import { CategoriaService } from '../../services/categoria';
import { EstadoService } from '../../services/estado';
import { Noticia } from '../../interfaces/noticia.interface';

@Component({
  selector: 'app-lista-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-noticias.html',
  styleUrls: ['./lista-noticias.css']
})
export class ListaNoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  noticiasFiltradas: Noticia[] = [];
  categorias: any[] = [];
  estados: any[] = [];
  cargando: boolean = true;
  error: string = '';
  
  categoriaSeleccionada: string = '';
  estadoSeleccionado: string = '';

  constructor(
    private noticiaService: NoticiaService,
    private categoriaService: CategoriaService,
    private estadoService: EstadoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    
    this.noticiaService.obtenerNoticias().subscribe({
      next: (noticias) => {
        this.noticias = noticias;
        this.noticiasFiltradas = noticias;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las noticias';
        this.cargando = false;
        console.error('Error:', err);
      }
    });

    this.categoriaService.obtenerCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => console.error('Error al cargar categorías:', err)
    });

    this.estadoService.obtenerEstados().subscribe({
      next: (estados) => {
        this.estados = estados;
      },
      error: (err) => console.error('Error al cargar estados:', err)
    });
  }

  filtrarNoticias() {
    this.noticiasFiltradas = this.noticias.filter(noticia => {
      const cumpleCategoria = !this.categoriaSeleccionada || 
        noticia.categoria_id.toString() === this.categoriaSeleccionada;
      const cumpleEstado = !this.estadoSeleccionado || 
        noticia.estado_id.toString() === this.estadoSeleccionado;
      return cumpleCategoria && cumpleEstado;
    });
  }

  limpiarFiltros() {
    this.categoriaSeleccionada = '';
    this.estadoSeleccionado = '';
    this.noticiasFiltradas = this.noticias;
  }

  verDetalle(id: number | undefined) {
    if (id) {
      this.router.navigate(['/noticia', id]);
    }
  }
}
