import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { RuntimeRegistryService } from '@optim-ui/lib-federation';
import { DynamicRoutesService } from './core/dynamic-routes.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`
})
export class AppComponent {
  private dynamicRoutes = inject(DynamicRoutesService);
  private registry = inject(RuntimeRegistryService);
  private router = inject(Router);

  constructor() {
    queueMicrotask(async () => {
      await this.dynamicRoutes.applyRoutes();
      const target = this.registry.manifest()?.layout.homeRoute ?? '/login';
      await this.router.navigateByUrl(target);
    });
  }
}