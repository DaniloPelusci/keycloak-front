import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from '../auth/keycloak.service';

@Component({
  selector: 'app-header',
  template: `
    <span *ngIf="userName() as name">Bem-vindo, {{ name }}</span>
    <span *ngIf="roles().includes('admin')">| Você é um lead manager!</span>
    <button (click)="logout()">Sair</button>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent {
  private keycloakService = inject(KeycloakService);
  userName = this.keycloakService.userNameSignal;
  roles = this.keycloakService.userRolesSignal;

  logout() {
    this.keycloakService.logout();
  }
}
