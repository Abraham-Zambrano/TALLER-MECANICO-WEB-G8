import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CitasComponent } from './citas.component';

@Component({
  selector: 'app-cita-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './cita-dialog.component.html',
  styleUrls: ['./cita-dialog.component.css']
})
export class CitaDialogComponent {
  datos: any = {
    cliente: '',
    fecha: '',
    hora: '',
    servicio: '',
    estado: 'Pendiente',
    tecnico: ''
  };

  estadoOptions = ['Pendiente', 'Confirmada', 'Cancelada'];

  constructor(
    public dialogRef: MatDialogRef<CitaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.datos = { ...data };
      if (!this.estadoOptions.includes(this.datos.estado)) {
        this.datos.estado = 'Pendiente';
      }
    }
  }

  guardar() {
    this.dialogRef.close(this.datos);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
