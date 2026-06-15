import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@optim-ui/lib-auth';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="login-page">
      <h1>Connexion</h1>
      <p>Ce bouton simule une authentification locale.</p>
      <button (click)="login()">Se connecter</button>
    </section>
  `,
  styles: [`
    .login-page { max-width: 420px; margin: 64px auto; padding: 24px; }
    button { padding: 12px 18px; }
  `]
})

export class LoginPageComponent {
  private auth = inject(AuthFacade);
  private router = inject(Router);

  login(): void {
    this.auth.login();
//    this.router.navigateByUrl('/');
    location.reload();
  }
}

export class App {
  protected readonly title = signal('mfe-login');
}
