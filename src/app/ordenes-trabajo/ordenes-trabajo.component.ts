import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
mport { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

interface OrdenTrabajo {
  id: number;
  vehiculo: string;
  diagnostico: string;
  mecanico: string;
  estado: string;
  fechaCreacion: string;
  observaciones?: string;
}
@Component({
  selector: 'app-ordenes-trabajo',
  standalone:true,
  imports: [
     ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './ordenes-trabajo.component.html',
  styleUrl: './ordenes-trabajo.component.css'
})
export class OrdenesTrabajoComponent {
ordenes: OrdenTrabajo[] = [];
  ordenForm: FormGroup;
  filtro: string = '';
  editando: boolean = false;
  ordenEditando: OrdenTrabajo | null = null;

  estados = ['Pendiente', 'En Proceso', 'Finalizado', 'Cancelado'];

  constructor(private fb: FormBuilder) {
    this.ordenForm = this.fb.group({
      vehiculo: ['', Validators.required],
      diagnostico: ['', Validators.required],
      mecanico: ['', Validators.required],
      estado: ['', Validators.required],
      fechaCreacion: [this.obtenerFechaActual(), Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('ordenesTrabajo');
    if (storedData) {
      this.ordenes = JSON.parse(storedData);
    }
  }

  get ordenesFiltradas(): OrdenTrabajo[] {
    if (!this.filtro) return this.ordenes;
    const termino = this.filtro.toLowerCase();
    return this.ordenes.filter(orden =>
      orden.vehiculo.toLowerCase().includes(termino) ||
      orden.diagnostico.toLowerCase().includes(termino) ||
      orden.mecanico.toLowerCase().includes(termino) ||
      orden.estado.toLowerCase().includes(termino) ||
      (orden.observaciones && orden.observaciones.toLowerCase().includes(termino))
    );
  }

  obtenerFechaActual(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  nuevaOrden(): void {
    this.ordenForm.reset({
      vehiculo: '',
      diagnostico: '',
      mecanico: '',
      estado: '',
      fechaCreacion: this.obtenerFechaActual(),
      observaciones: ''
    });
    this.editando = false;
    this.ordenEditando = null;
  }

  editarOrden(orden: OrdenTrabajo): void {
    this.ordenForm.patchValue(orden);
    this.editando = true;
    this.ordenEditando = orden;
  }

  eliminarOrden(orden: OrdenTrabajo): void {
    if (confirm(`¿Estás seguro de eliminar la orden de trabajo #${orden.id}?`)) {
      this.ordenes = this.ordenes.filter(o => o.id !== orden.id);
      this.guardarEnStorage();
    }
  }

  guardar(): void {
    if (this.ordenForm.valid) {
      if (this.editando && this.ordenEditando) {
        const index = this.ordenes.findIndex(o => o.id === this.ordenEditando!.id);
        if (index !== -1) {
          this.ordenes[index] = { ...this.ordenEditando, ...this.ordenForm.value };
        }
      } else {
        const nuevoId = this.ordenes.length > 0 ? Math.max(...this.ordenes.map(o => o.id)) + 1 : 1;
        this.ordenes.push({ id: nuevoId, ...this.ordenForm.value });
      }
      
      this.guardarEnStorage();
      this.nuevaOrden();
    }
  }

  private guardarEnStorage(): void {
    localStorage.setItem('ordenesTrabajo', JSON.stringify(this.ordenes));
  }

  cancelar(): void {
    this.nuevaOrden();
  }
}
