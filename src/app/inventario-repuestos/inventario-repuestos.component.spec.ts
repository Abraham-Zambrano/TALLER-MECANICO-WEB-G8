import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioRepuestosComponent } from './inventario-repuestos.component';

describe('InventarioRepuestosComponent', () => {
  let component: InventarioRepuestosComponent;
  let fixture: ComponentFixture<InventarioRepuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioRepuestosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioRepuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
