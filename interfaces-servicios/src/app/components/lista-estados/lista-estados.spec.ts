import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstados } from './lista-estados';

describe('ListaEstados', () => {
  let component: ListaEstados;
  let fixture: ComponentFixture<ListaEstados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEstados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEstados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
