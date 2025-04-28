import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../.././auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule
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
      route: '/clientes'
    },
    {
      title: 'Gestión de Vehículos',
      description: 'Registro y seguimiento de vehículos',
      icon: 'directions_car',
      route: '/vehiculos'
    },
    {
      title: 'Ordenes de Trabajo',
      description: 'Creación y seguimiento de OT',
      icon: 'assignment',
      route: '/ordenes'
    },
    {
      title: 'Inventario',
      description: 'Control de repuestos y materiales',
      icon: 'inventory',
      route: '/inventario'
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