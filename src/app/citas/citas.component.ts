import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CitaDialogComponent } from './cita-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

interface Cita {
  id: number;
  cliente: string;
  fecha: string;
  hora: string;
  servicio: string;
  estado: 'Pendiente' | 'Confirmada' | 'Cancelada';
  tecnico: string;
}
@Component({
  selector: 'app-citas',
  imports: [
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {
citas: Cita[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) {}

  abrirDialogoCita(cita?: Cita): void {
    const isEdit = !!cita;

    const dialogRef = this.dialog.open(CitaDialogComponent, {
      width: '500px',
      data: cita ? { ...cita } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit) {
          // Editar
          this.editarCita(result);
        } else {
          // Crear
          this.agregarCita(result)
        }
      }
    });
  }

  ngOnInit() {
    const citasGuardadas = localStorage.getItem('citas');
    this.citas = citasGuardadas ? JSON.parse(citasGuardadas) : [];
  }

  guardarCitasEnLocalStorage() {
    localStorage.setItem('citas', JSON.stringify(this.citas));
  }
  
  irAHome() {
    this.router.navigate(['/home']);
  }

  generarNuevoId(): number {
    return this.citas.length > 0 ? Math.max(...this.citas.map(c => c.id)) + 1 : 1;
  }

  agregarCita(nuevaCita: any) {
    nuevaCita.id = this.generarNuevoId(); // Asigna ID único
    this.citas.push(nuevaCita);
    this.citas = [...this.citas];
    this.guardarCitasEnLocalStorage();
  }
  
  editarCita(citaEditada: any) {
    const index = this.citas.findIndex(c => c.id === citaEditada.id);
    if (index > -1) {
      this.citas[index] = citaEditada;
      this.citas = [...this.citas];
      this.guardarCitasEnLocalStorage();
    }
  }
  
  eliminarCita(id: number) {
    this.citas = this.citas.filter(c => c.id !== id);
    this.citas = [...this.citas];
    this.guardarCitasEnLocalStorage();
  }
}
