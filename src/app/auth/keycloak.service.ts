import { Injectable, signal } from '@angular/core';
import Keycloak, { KeycloakInstance } from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak!: KeycloakInstance;
  userNameSignal = signal<string | undefined>(undefined);
  userRolesSignal = signal<string[]>([]);

  async init() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:9080',
      realm: 'crmteste',
      clientId: 'crmapi'
    });

    await this.keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    });

    // Seta o nome após a autenticação
    const username = this.keycloak.tokenParsed?.['preferred_username'] as string | undefined;
    this.userNameSignal.set(username);

    const roles = this.keycloak.tokenParsed?.['resource_access']?.['crmapi']?.['roles'] ?? [];
    this.userRolesSignal.set(roles);
  }

  // ...resto igual
  isLoggedIn(): boolean { return !!this.keycloak.token; }
  getToken(): string | undefined { return this.keycloak.token; }
  getUserRoles(): string[] {
    if (!this.keycloak || !this.keycloak.tokenParsed) return [];
    return this.keycloak.tokenParsed['resource_access']?.['crmapi']?.['roles'] ?? [];
  }
  login() { this.keycloak.login(); }
  logout() { this.keycloak.logout(); }
}
