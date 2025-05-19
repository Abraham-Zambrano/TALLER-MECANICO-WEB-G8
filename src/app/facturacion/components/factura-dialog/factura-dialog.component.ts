import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-factura-dialog',
  standalone: true,
  templateUrl: './factura-dialog.component.html',
  styleUrls: ['./factura-dialog.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class FacturaDialogComponent {
  facturaForm: FormGroup;
  estados = ['Pendiente', 'Pagada', 'Anulada'];
  clientes = ['Hector Hidalgo', 'María de Jesus Gómez', 'Carlos Ruiz Gonzalez','Juan Sebastian Vera','Melany Denisse Alvarez'];
  vehiculos = ['Toyota Corolla', 'Hyundai Tucson', 'Chevrolet Spark'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FacturaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.facturaForm = this.fb.group({
      numero: ['', Validators.required],
      fecha: ['', Validators.required],
      cliente: ['', Validators.required],
      correo:['',Validators.required],
      vehiculo: ['', Validators.required],
      ordenTrabajo:['',Validators.required],
      total: ['', [Validators.required, Validators.min(0.01)]],
      estado: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (this.facturaForm.valid) {
      this.dialogRef.close({
        ...this.facturaForm.value,
        id: this.data.modo === 'editar' ? this.data.factura.id : null
      });
    }
  }
}