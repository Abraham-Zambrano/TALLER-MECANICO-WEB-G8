import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { AuthService } from '../.././auth.service';

@Component({
  selector: 'app-home-principal',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
  ],
  templateUrl: './home-principal.component.html',
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent {
modules = [
    {
      title: 'Gestión de Clientes',
      description: 'Administración de clientes y historial',
      icon: 'people',
      route: '/clientes',
      color: 'primary'
    },
    {
      title: 'Ordenes de Trabajo',
      description: 'Creación y seguimiento de OT',
      icon: 'assignment',
      route: '/ordenTrabajo',
      color: 'warn'
    },
    {
      title: 'Inventario',
      description: 'Control de repuestos y materiales',
      icon: 'inventory',
      route: '/inventario',
      color: 'primary'
    },
    {
      title: 'Facturación',
      description: 'Emisión y gestión de facturas',
      icon: 'receipt',
      route: '/facturacion',
      color: 'accent'
    },
    {
      title: 'Gestión de Citas',
      description: 'Agendamiento y control de citas',
      icon: 'event',
      route: '/citas',
      color: 'warn'
    }
  ];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
