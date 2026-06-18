import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthApiService } from '../core/services/auth-api.service';
import { AuthStorageService } from '../core/services/auth-storage.service';
import { POST_LOGIN_REDIRECT_URL } from '../core/constants/auth.constants';

/*
 * ================================
 * Optim Portal (Sibylle project)
 *      └── MFE Login
 * 
 * @purpose: Callback IDP sur success
 * Affiche un état transitoire et va recuperer le bearer token 
 * en echange de l'authorization code
 * ================================
 */

@Component({
  selector: 'app-sso-callback-success-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="callback-page">
      <div class="callback-card">
        <h1>Connexion SSO</h1>

        <p *ngIf="loading()">Finalisation de la connexion en cours...</p>

        <ng-container *ngIf="!loading() && errorMessage()">
          <p class="error">{{ errorMessage() }}</p>
          <a routerLink="/login">Retour à la connexion</a>
        </ng-container>
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
export class SsoCallbackSuccessPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly authApi = inject(AuthApiService);
  private readonly authStorage = inject(AuthStorageService);

  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const authorizationToken =
      this.route.snapshot.queryParamMap.get('authorizationToken') ??
      this.route.snapshot.queryParamMap.get('token');

    if (!authorizationToken) {
      this.loading.set(false);
      this.errorMessage.set('Jeton de retour SSO manquant.');
      return;
    }

    this.authApi.exchangeAuthorizationToken(authorizationToken).subscribe({
      next: (token) => {
        this.authStorage.setToken(token);
        window.location.href = POST_LOGIN_REDIRECT_URL;
      },
      error: (error) => {
        this.loading.set(false);
        this.errorMessage.set(
          error?.error?.message ??
            error?.error?.errors?.[0]?.message ??
            'Échec de finalisation de la connexion SSO.',
        );
      },
    });
  }
}
