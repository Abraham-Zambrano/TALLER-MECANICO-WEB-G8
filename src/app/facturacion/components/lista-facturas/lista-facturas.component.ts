import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FacturaDialogComponent } from '../factura-dialog/factura-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

interface Factura {
  id: number;
  numero: string;
  fecha: Date;
  cliente: string;
  correo:string;
  ordenTrabajo:string;
  vehiculo: string;
  total: number;
  estado: 'Pendiente' | 'Pagada' | 'Anulada';
  pdfUrl:string;
}

@Component({
  selector: 'app-lista-facturas',
  standalone: true,
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    FacturaDialogComponent
  ]
})
export class ListaFacturasComponent implements OnInit {
  facturas: Factura[] = [
    { id: 1, numero: 'FAC-001', fecha: new Date('2023-05-15'), cliente: 'Juan Pérez',correo:'JPerez@gmail.com',ordenTrabajo:'OT-098', vehiculo: 'Toyota Corolla', total: 150.75, estado: 'Pagada',pdfUrl:'/ruta12' },
    { id: 2, numero: 'FAC-002', fecha: new Date('2023-06-20'), cliente: 'Barbara Belen',correo :'BarbiBelen@hotmail.com',ordenTrabajo:'OT-123',vehiculo: 'Hyundai Tucson', total: 320.50, estado: 'Pendiente',pdfUrl:'/ruta32'},
    { id: 3, numero: 'FAC-003', fecha: new Date('2023-07-10'), cliente: 'Carlos Ruiz',correo:'CarloRui@outlook.com',ordenTrabajo:'0T-109', vehiculo: 'Chevrolet Spark', total: 85.25, estado: 'Pagada',pdfUrl:'/rutas142' },
  ];

  displayedColumns: string[] = [
    'numero',
    'fecha',
    'cliente',
    'correo',
    'ordenTrabajo',
    'vehiculo',
    'total',
    'estado',
    'verPdf',
    'acciones'
  ];
    dataSource = new MatTableDataSource(this.facturas);
  
  filtro: string = '';
  pageSize = 5;
  pageIndex = 0;
  sortDirection: 'asc' | 'desc' = 'asc';
  sortActive: string = 'fecha';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.facturas);
  }

  get facturasFiltradas() {
    return this.facturas.filter(factura => 
      factura.numero.toLowerCase().includes(this.filtro.toLowerCase()) ||
      factura.cliente.toLowerCase().includes(this.filtro.toLowerCase()) ||
      factura.vehiculo.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  sortData(sort: Sort) {
    this.sortActive = sort.active;
    this.sortDirection = sort.direction === 'asc' ? 'asc' : 'desc'; 
    
    this.facturas.sort((a, b) => {
      const isAsc = this.sortDirection === 'asc';
      switch (this.sortActive) {
        case 'numero': 
          return compare(a.numero, b.numero, isAsc);
        case 'fecha': 
          return compare(a.fecha, b.fecha, isAsc);
        case 'cliente': 
          return compare(a.cliente, b.cliente, isAsc);
        case 'total': 
          return compare(a.total, b.total, isAsc);
        case 'estado': 
          return compare(a.estado, b.estado, isAsc);
        default: 
          return 0;
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  abrirDialogoNuevaFactura(): void {
    const dialogRef = this.dialog.open(FacturaDialogComponent, {
      width: '800px',
      data: { 
        modo: 'crear',
        factura: {
          numero: '',
          fecha: new Date().toISOString().split('T')[0],
          cliente: '',
          vehiculo: '',
          total: 0,
          estado: 'Pendiente'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.facturas = [...this.facturas, {
          ...result,
          id: this.generarNuevoId(),
          fecha: new Date(result.fecha)
        }];
      }
    });
  }

  editarFactura(factura: Factura): void {
    const dialogRef = this.dialog.open(FacturaDialogComponent, {
      width: '800px',
      data: { 
        modo: 'editar',
        factura: { ...factura }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.facturas = this.facturas.map(f => 
          f.id === result.id ? { 
            ...result, 
            fecha: new Date(result.fecha) 
          } : f
        );
      }
    });
  }
  verPDF(factura: any): void {
    //Trabajr con backend
    if (factura.pdfUrl) {
      window.open(factura.pdfUrl, '_blank');
    } else {
      console.warn('No se encontró URL de PDF para esta factura');
    }
  }  
  eliminarFactura(id: number): void {
    if (confirm('¿Está seguro que desea anular esta factura?')) {
      this.facturas = this.facturas.map(f => 
        f.id === id ? { ...f, estado: 'Anulada' } : f
      );
    }
  }

  generarNuevoId(): number {
    return this.facturas.length > 0 
      ? Math.max(...this.facturas.map(f => f.id)) + 1 
      : 1;
  }
}

function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}