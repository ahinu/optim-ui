import { Injectable, signal } from '@angular/core';
import { FrontendManifest, FrontendModule } from '@optim-ui/lib-contracts';

@Injectable({ providedIn: 'root' })
export class RuntimeRegistryService {
  private manifestSig = signal<FrontendManifest | null>(null);

  setManifest(manifest: FrontendManifest): void {
    this.manifestSig.set(manifest);
  }

  manifest(): FrontendManifest | null {
    return this.manifestSig();
  }

  modules(): FrontendModule[] {
    return this.manifestSig()?.modules ?? [];
  }

  publicModules(): FrontendModule[] {
    return this.modules().filter(m => !!m.public);
  }

  privateModules(): FrontendModule[] {
    return this.modules()
      .filter(m => !m.public)
      .sort((a, b) => (a.navOrder ?? 999) - (b.navOrder ?? 999));
  }
}