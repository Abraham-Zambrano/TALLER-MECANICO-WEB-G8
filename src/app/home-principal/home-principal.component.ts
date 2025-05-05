// home-principal.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';

interface Cliente {
  id: number;
  nombre: string;
  vehiculo: string;
  modelo: string;
  placa: string;
  telefono: string;
  ultimaVisita: Date;
}

@Component({
  selector: 'app-home-principal',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './home-principal.component.html',
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent {
  clientes: Cliente[] = [
    { id: 1, nombre: 'Juan Pérez', vehiculo: 'Toyota', modelo: 'Corolla', placa: 'ABC-1234', telefono: '0991234567', ultimaVisita: new Date('2023-05-15') },
    { id: 2, nombre: 'María Gómez', vehiculo: 'Hyundai', modelo: 'Tucson', placa: 'XYZ-5678', telefono: '0987654321', ultimaVisita: new Date('2023-06-20') },
    { id: 3, nombre: 'Carlos Ruiz', vehiculo: 'Chevrolet', modelo: 'Spark', placa: 'DEF-9012', telefono: '0976543210', ultimaVisita: new Date('2023-07-10') },
   
  ];

  displayedColumns: string[] = ['nombre', 'vehiculo', 'modelo', 'placa', 'telefono', 'ultimaVisita', 'acciones'];
  
  filtro: string = '';
  pageSize = 5;
  pageIndex = 0;
  sortDirection: 'asc' | 'desc' = 'asc';
  sortActive: string = 'nombre';

  constructor(private dialog: MatDialog) {}

  get clientesFiltrados() {
    return this.clientes.filter(cliente => 
      cliente.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      cliente.vehiculo.toLowerCase().includes(this.filtro.toLowerCase()) ||
      cliente.placa.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
  sortData(sort: Sort) {
    this.sortActive = sort.active;
    this.sortDirection = sort.direction === 'asc' ? 'asc' : 'desc'; 
    
    this.clientes.sort((a, b) => {
      const isAsc = this.sortDirection === 'asc';
      switch (this.sortActive) {
        case 'nombre': 
          return compare(a.nombre, b.nombre, isAsc);
        case 'vehiculo': 
          return compare(a.vehiculo, b.vehiculo, isAsc);
        case 'modelo': 
          return compare(a.modelo, b.modelo, isAsc);
        case 'ultimaVisita': 
          return compare(a.ultimaVisita, b.ultimaVisita, isAsc);
        default: 
          return 0;
      }
    });
  }

  editarCliente(cliente: any): void {
  const dialogRef = this.dialog.open(ClienteDialogComponent, {
    width: '600px',
    data: { 
      modo: 'editar',
      cliente: { ...cliente }
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.clientes = this.clientes.map(c => 
        c.id === result.id ? { 
          ...result, 
          ultimaVisita: new Date(result.ultimaVisita) 
        } : c
      );
    }
  });
}
  // Maneja la paginación
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  // Abre el diálogo para nuevo cliente
  abrirDialogoNuevoCliente(): void {
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '600px',
      data: { 
        modo: 'crear',
        cliente: {
          nombre: '',
          vehiculo: '',
          modelo: '',
          placa: '',
          telefono: '',
          ultimaVisita: new Date().toISOString().split('T')[0]
        }
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientes = [...this.clientes, {
          ...result,
          id: this.generarNuevoId(),
          ultimaVisita: new Date(result.ultimaVisita)
        }];
      }
    });
  }
  
  generarNuevoId(): number {
    return this.clientes.length > 0 
      ? Math.max(...this.clientes.map(c => c.id)) + 1 
      : 1;
  }
  // Elimina un cliente
  eliminarCliente(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este cliente?')) {
      this.clientes = this.clientes.filter(cliente => cliente.id !== id);
    }
  }
}
// Función auxiliar para ordenar
function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
