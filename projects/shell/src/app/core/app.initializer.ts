import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthFacade } from '@optim-ui/lib-auth';
import { ManifestService, RuntimeRegistryService } from '@optim-ui/lib-federation';

export function shellInitializer() {
  return async () => {
    const auth = inject(AuthFacade);
    const manifestService = inject(ManifestService);
    const registry = inject(RuntimeRegistryService);

    const manifest = await firstValueFrom(
      manifestService.getManifest(auth.isAuthenticated())
    );

    registry.setManifest(manifest);
  };
}