import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from './keycloak.service';

export const leadManagerGuard: CanActivateFn = () => {
  const router = inject(Router);
  const keycloakService = inject(KeycloakService);
  const roles = keycloakService.getUserRoles();

  if (roles.includes('lead_manager')) {
    return true;
  } else {
    router.navigate(['/acesso-negado']);
    return false;
  }
};
