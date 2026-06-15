import { Injectable, inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { RuntimeRegistryService } from '@optim-ui/lib-federation';
import { PublicLayoutComponent } from '../public-layout.component';
import { PrivateLayoutComponent } from '../private-layout.component';

@Injectable({ providedIn: 'root' })
export class DynamicRoutesService {
  private router = inject(Router);
  private registry = inject(RuntimeRegistryService);

  async applyRoutes(): Promise<void> {
    const manifest = this.registry.manifest();
    if (!manifest) return;

    const publicModules = this.registry.publicModules();
    const privateModules = this.registry.privateModules();

    const publicRoutes = publicModules.map(module => ({
      path: module.routePath,
      loadChildren: () =>
        loadRemoteModule(module.remoteName, module.exposedModule)
          .then(m => m.APP_ROUTES ?? m.routes ?? m.default)
    }));

    const securedRoutes = privateModules.map(module => ({
      path: module.routePath,
      loadChildren: () =>
        loadRemoteModule(module.remoteName, module.exposedModule)
          .then(m => m.APP_ROUTES ?? m.routes ?? m.default)
    }));

    const routes: Routes = [
      {
        path: '',
        component: PublicLayoutComponent,
        children: publicRoutes
      },
      {
        path: '',
        component: PrivateLayoutComponent,
        children: securedRoutes
      },
      {
        path: '**',
        redirectTo: manifest.layout.homeRoute ?? '/login'
      }
    ];

    this.router.resetConfig(routes);
  }
}