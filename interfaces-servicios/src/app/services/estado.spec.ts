import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EstadoService } from './estado';
import { Estado } from '../interfaces/estado.interface';

describe('EstadoService', () => {
  let service: EstadoService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/estados';

  const mockEstado: Estado = {
    id: '1',
    nombre: 'Activo',
    abreviacion: 'ACT',
    activo: true,
    UserAlta: 'admin',
    FechaAlta: '2025-01-01',
    UserMod: 'admin',
    FechaMod: '2025-01-01',
    UserBaja: '',
    FechaBaja: '',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EstadoService]
    });
    service = TestBed.inject(EstadoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all estados', () => {
    const mockEstados: Estado[] = [mockEstado];

    service.obtenerEstados().subscribe(estados => {
      expect(estados).toEqual(mockEstados);
      expect(estados.length).toBe(1);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockEstados);
  });

  it('should create a new estado', () => {
    const newEstado: Estado = { ...mockEstado };
    delete newEstado.id;

    service.crearEstado(newEstado).subscribe(estado => {
      expect(estado).toEqual(mockEstado);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEstado);
    req.flush(mockEstado);
  });

  it('should update an estado', () => {
    const updatedEstado: Estado = { ...mockEstado, nombre: 'Inactivo' };

    service.actualizarEstado('1', updatedEstado).subscribe(estado => {
      expect(estado).toEqual(updatedEstado);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEstado);
    req.flush(updatedEstado);
  });

  it('should delete an estado', () => {
    service.eliminarEstado('1').subscribe(estado => {
      expect(estado).toEqual(mockEstado);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockEstado);
  });
});
