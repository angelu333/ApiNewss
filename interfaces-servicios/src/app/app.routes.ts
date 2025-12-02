import { Routes } from '@angular/router';
import { ListaEstadosComponent } from './components/lista-estados/lista-estados';
import { ListaCategoriasComponent } from './components/lista-categorias/lista-categorias';
import { ListaNoticiasComponent } from './components/lista-noticias/lista-noticias';
import { DetalleNoticiaComponent } from './components/detalle-noticia/detalle-noticia';

export const routes: Routes = [
  { path: 'lista-noticias', component: ListaNoticiasComponent },
  { path: 'noticia/:id', component: DetalleNoticiaComponent },
  { path: 'lista-estados', component: ListaEstadosComponent },
  { path: 'lista-categorias', component: ListaCategoriasComponent },
  { path: '', redirectTo: '/lista-noticias', pathMatch: 'full' }
];
