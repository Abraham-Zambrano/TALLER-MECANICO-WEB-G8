import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cliente-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.css']
})
export class ClienteDialogComponent {
  cliente: any = {
    nombre: '',
    vehiculo: '',
    modelo: '',
    placa: '',
    telefono: '',
    ultimaVisita: new Date().toISOString().split('T')[0]
  };

  vehiculos = ['Toyota', 'Hyundai', 'Chevrolet', 'Ford', 'Nissan', 'Kia'];

  constructor(
    public dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.modo === 'editar') {
      this.cliente = { 
        ...data.cliente,
        ultimaVisita: data.cliente.ultimaVisita.toISOString().split('T')[0]
      };
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.cliente);
  }
  formularioValido(): boolean {
    return !!this.cliente.nombre && 
           !!this.cliente.vehiculo && 
           !!this.cliente.modelo && 
           !!this.cliente.placa && 
           !!this.cliente.telefono;
  }
}