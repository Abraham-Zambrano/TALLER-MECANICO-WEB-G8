import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

interface Diagnostico {
  id: number;
  vehiculo: string;
  sintomas: string;
  observaciones: string;
  partesAfectadas: string;
  recomendaciones: string;
}

@Component({
  selector: 'app-diagnostico',
  standalone: true,
  
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
  diagnosticos: Diagnostico[] = [];
  diagnosticoForm: FormGroup;
  filtro: string = '';
  editando: boolean = false;
  diagnosticoEditando: Diagnostico | null = null;

  constructor(private fb: FormBuilder) {
    this.diagnosticoForm = this.fb.group({
      vehiculo: ['', Validators.required],
      sintomas: [''],
      observaciones: [''],
      partesAfectadas: [''],
      recomendaciones: ['']
    });
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('diagnosticos');
    if (storedData) {
      this.diagnosticos = JSON.parse(storedData);
    }
  }

  get diagnosticosFiltrados(): Diagnostico[] {
    if (!this.filtro) return this.diagnosticos;
    const termino = this.filtro.toLowerCase();
    return this.diagnosticos.filter(d =>
      d.vehiculo.toLowerCase().includes(termino) ||
      d.sintomas.toLowerCase().includes(termino) ||
      d.observaciones.toLowerCase().includes(termino) ||
      d.partesAfectadas.toLowerCase().includes(termino) ||
      d.recomendaciones.toLowerCase().includes(termino)
    );
  }

  nuevoDiagnostico(): void {
    this.diagnosticoForm.reset();
    this.editando = false;
    this.diagnosticoEditando = null;
  }

  editarDiagnostico(diagnostico: Diagnostico): void {
    this.diagnosticoForm.patchValue(diagnostico);
    this.editando = true;
    this.diagnosticoEditando = diagnostico;
  }

  eliminarDiagnostico(diagnostico: Diagnostico): void {
    if (confirm('¿Estás seguro de eliminar este diagnóstico?')) {
      this.diagnosticos = this.diagnosticos.filter(d => d.id !== diagnostico.id);
      this.guardarEnStorage();
    }
  }

  guardar(): void {
    if (this.diagnosticoForm.valid) {
      if (this.editando && this.diagnosticoEditando) {
        const index = this.diagnosticos.findIndex(d => d.id === this.diagnosticoEditando!.id);
        if (index !== -1) {
          this.diagnosticos[index] = {
            ...this.diagnosticoEditando,
            ...this.diagnosticoForm.value
          };
        }
      } else {
        const nuevoId = this.diagnosticos.length > 0
          ? Math.max(...this.diagnosticos.map(d => d.id)) + 1
          : 1;
        this.diagnosticos.push({
          id: nuevoId,
          ...this.diagnosticoForm.value
        });
      }
      this.guardarEnStorage();
      this.nuevoDiagnostico();
    }
  }

  private guardarEnStorage(): void {
    localStorage.setItem('diagnosticos', JSON.stringify(this.diagnosticos));
  }

  cancelar(): void {
    this.nuevoDiagnostico();
  }
}
