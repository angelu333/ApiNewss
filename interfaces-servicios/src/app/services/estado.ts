import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Estado } from '../interfaces/estado.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private apiUrl = 'http://localhost:3000/api/states';
  private options = {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoiMSIsInBlcmZpbF9pZCI6IjEiLCJub21icmUiOiJBZG1pbmlzdHJhZG9yIiwiYXBlbGxpZG9zIjoiR2VuZXJhbCIsIm5pY2siOiJBZG1pbiJ9LCJpYXQiOjE2OTIyMDY1MDIsImV4cCI6MTY5MjI5MjkwMn0.pw8K5GxPwv0-cIeNnC54rXoXZXNoF7v6xo6BYsJNC9A"
    }
  };

  constructor(private http: HttpClient) { }

  obtenerEstados(): Observable<Estado[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data || response)
    );
  }

  crearEstado(): Observable<Estado> {
    const nuevoEstado: Estado = {
      nombre: "Sonora",
      abreviacion: "SON",
      activo: true,
      UserAlta: 'Admin',
      FechaAlta: '1990-01-01',
      UserMod: '',
      FechaMod: '1990-01-01',
      UserBaja: '',
      FechaBaja: '1990-01-01',
    };

    return this.http.post<any>(this.apiUrl, nuevoEstado, this.options).pipe(
      map(response => response.data || response)
    );
  }

  actualizarEstado(id: number): Observable<Estado> {
    const estadoActualizado: Estado = {
      nombre: "Yucatan",
      abreviacion: "YUC",
      activo: true,
      UserAlta: 'Admin',
      FechaAlta: '1990-01-01',
      UserMod: '',
      FechaMod: '1990-01-01',
      UserBaja: '',
      FechaBaja: '1990-01-01',
    };

    return this.http.put<any>(this.apiUrl + '/' + id, estadoActualizado, this.options).pipe(
      map(response => response.data || response)
    );
  }

  eliminarEstado(id: number): Observable<Estado> {
    return this.http.delete<any>(this.apiUrl + '/' + id, this.options).pipe(
      map(response => response.data || response)
    );
  }
}
