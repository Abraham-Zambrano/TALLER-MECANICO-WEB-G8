import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, CommonModule],
  template: `
    <mat-toolbar color="primary" class="footer">
      <div class="footer-content">
        <span class="copyright">© {{currentYear}} Taller Mecánico G8 - Todos los derechos reservados</span>
        <div class="footer-links">
          <a href="#" class="link">Términos y condiciones</a>
          <a href="#" class="link">Política de privacidad</a>
          <a href="#" class="link">Contacto</a>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
    }
    .footer-content {
      width: 100%;
      max-width: 1200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
    }
    .copyright {
      font-size: 14px;
    }
    .footer-links {
      display: flex;
      gap: 16px;
    }
    .link {
      color: white;
      text-decoration: none;
      font-size: 14px;
    }
    .link:hover {
      text-decoration: underline;
    }
  `]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}