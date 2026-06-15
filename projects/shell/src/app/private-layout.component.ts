import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RuntimeRegistryService } from '@optim-ui/lib-federation';
import { AuthFacade } from '@optim-ui/lib-auth';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <header class="topbar">
      <strong>{{ appName() }}</strong>
      <div>
        <span *ngIf="displayName() as name">{{ name }}</span>
        <button (click)="logout()">Logout</button>
      </div>
    </header>

    <div class="shell">
      <aside class="sidebar">
        <a *ngFor="let item of navItems()" [routerLink]="['/', item.routePath]">
          {{ item.displayName }}
        </a>
      </aside>

      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .topbar { height: 56px; padding: 0 16px; display:flex; align-items:center; justify-content:space-between; background:#111827; color:white; }
    .shell { display:flex; min-height:calc(100vh - 56px); }
    .sidebar { width:220px; padding:16px; background:#f3f4f6; display:flex; flex-direction:column; gap:8px; }
    .content { flex:1; padding:24px; }
    a { color:#111827; text-decoration:none; }
    button { margin-left:12px; }
  `]
})
export class PrivateLayoutComponent {
  private registry = inject(RuntimeRegistryService);
  private auth = inject(AuthFacade);

  appName = computed(() => this.registry.manifest()?.layout.appName ?? 'Portal');
  displayName = computed(() => this.registry.manifest()?.user?.displayName ?? null);
  navItems = computed(() => this.registry.privateModules());

  logout(): void {
    this.auth.logout();
    location.href = '/login';
  }
}