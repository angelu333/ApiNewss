import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Noticia } from '../interfaces/noticia.interface';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = 'http://localhost:3000/api/news';
  private options = {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoiMSIsInBlcmZpbF9pZCI6IjEiLCJub21icmUiOiJBZG1pbmlzdHJhZG9yIiwiYXBlbGxpZG9zIjoiR2VuZXJhbCIsIm5pY2siOiJBZG1pbiJ9LCJpYXQiOjE2OTIyMDY1MDIsImV4cCI6MTY5MjI5MjkwMn0.pw8K5GxPwv0-cIeNnC54rXoXZXNoF7v6xo6BYsJNC9A"
    }
  };

  constructor(private http: HttpClient) { }

  obtenerNoticias(): Observable<Noticia[]> {
    return this.http.get<any>(this.apiUrl, this.options).pipe(
      map(response => response.data || response)
    );
  }

  obtenerNoticia(id: number): Observable<Noticia> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, this.options).pipe(
      map(response => response.data || response)
    );
  }

  crearNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.post<any>(this.apiUrl, noticia, this.options).pipe(
      map(response => response.data || response)
    );
  }

  actualizarNoticia(id: number, noticia: Noticia): Observable<Noticia> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, noticia, this.options).pipe(
      map(response => response.data || response)
    );
  }

  eliminarNoticia(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.options).pipe(
      map(response => response.data || response)
    );
  }
}
