import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiaService } from '../../services/noticia';
import { Noticia } from '../../interfaces/noticia.interface';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-noticia.html',
  styleUrls: ['./detalle-noticia.css']
})
export class DetalleNoticiaComponent implements OnInit {
  noticia: Noticia | null = null;
  cargando: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noticiaService: NoticiaService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarNoticia(+id);
    }
  }

  cargarNoticia(id: number) {
    this.cargando = true;
    this.noticiaService.obtenerNoticia(id).subscribe({
      next: (noticia) => {
        this.noticia = noticia;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la noticia';
        this.cargando = false;
        console.error('Error:', err);
      }
    });
  }

  volver() {
    this.router.navigate(['/lista-noticias']);
  }
}
