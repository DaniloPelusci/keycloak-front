import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { KeycloakService } from './app/auth/keycloak.service';

async function main() {
  // Crie uma instância temporária manualmente para inicializar antes do bootstrap
  const keycloakService = new KeycloakService();
  await keycloakService.init();

  // Agora sim, inicie o Angular e passe o serviço já inicializado
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      { provide: KeycloakService, useValue: keycloakService }
    ]
  });
}

main();
