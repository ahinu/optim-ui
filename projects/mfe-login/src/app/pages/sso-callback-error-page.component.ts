import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

/*
 * ================================
 * Optim Portal (Sibylle project)
 *      └── MFE Login
 * 
 * @purpose: Callback IDP sur erreur
 * Affiche l'erreur rencontré et indique a l'utilisateur que son login SSO a échoué
 * ================================
 */


@Component({
  selector: 'app-sso-callback-error-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="callback-page">
      <div class="callback-card">
        <h1>Erreur de connexion SSO</h1>
        <p class="error">{{ errorMessage() }}</p>
        <a routerLink="/login">Retour à la connexion</a>
      </div>
    </section>
  `,
  styles: [`
    .callback-page {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 2rem;
      background: #f5f7fb;
    }

    .callback-card {
      width: 100%;
      max-width: 420px;
      padding: 2rem;
      border-radius: 1rem;
      background: #fff;
      box-shadow: 0 12px 32px rgba(0,0,0,0.08);
      text-align: center;
    }

    .error {
      color: #b91c1c;
      margin-bottom: 1rem;
    }
  `],
})
export class SsoCallbackErrorPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly errorMessage = signal('Une erreur inconnue est survenue.');

  ngOnInit(): void {
    const message =
      this.route.snapshot.queryParamMap.get('message') ??
      this.route.snapshot.queryParamMap.get('reason') ??
      this.route.snapshot.queryParamMap.get('error');

    if (message) {
      this.errorMessage.set(message);
    }
  }
}
