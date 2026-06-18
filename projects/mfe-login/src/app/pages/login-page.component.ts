import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../core/services/auth-api.service';
import { AuthStorageService } from '../core/services/auth-storage.service';
import { POST_LOGIN_REDIRECT_URL } from '../core/constants/auth.constants';

/*
 * ================================
 * Optim Portal (Sibylle project)
 *      └── MFE Login
 * 
 * @purpose: Page de login
 * ================================
 */

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="login-page">
      <div class="login-card">
        <h1>Connexion</h1>
        <p class="subtitle">Connectez-vous avec votre compte local ou via SSO.</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />

          <div class="field-error" *ngIf="emailInvalid()">
            Veuillez saisir une adresse email valide.
          </div>

          <label for="password">Mot de passe</label>
          <input id="password" type="password" formControlName="password" />

          <div class="field-error" *ngIf="passwordInvalid()">
            Le mot de passe est requis.
          </div>

          <button type="submit" [disabled]="loading() || form.invalid">
            {{ loading() ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <div class="separator">ou</div>

        <button type="button" class="sso-button" (click)="loginWithSso()" [disabled]="loading()">
          Se connecter avec Keycloak
        </button>

        <div class="global-error" *ngIf="errorMessage()">
          {{ errorMessage() }}
        </div>
      </div>
    </section>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 2rem;
      background: #f5f7fb;
    }

    .login-card {
      width: 100%;
      max-width: 420px;
      padding: 2rem;
      border-radius: 1rem;
      background: #fff;
      box-shadow: 0 12px 32px rgba(0,0,0,0.08);
    }

    h1 {
      margin: 0 0 0.5rem;
    }

    .subtitle {
      margin: 0 0 1.5rem;
      color: #64748b;
    }

    form {
      display: grid;
      gap: 0.75rem;
    }

    label {
      font-weight: 600;
      font-size: 0.95rem;
    }

    input {
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
      padding: 0.875rem 1rem;
      font-size: 1rem;
    }

    button {
      border: 0;
      border-radius: 0.75rem;
      padding: 0.9rem 1rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 0.5rem;
    }

    button[type="submit"] {
      background: #2563eb;
      color: #fff;
    }

    .sso-button {
      width: 100%;
      background: #0f172a;
      color: #fff;
    }

    .separator {
      margin: 1.25rem 0;
      text-align: center;
      color: #64748b;
    }

    .field-error,
    .global-error {
      color: #b91c1c;
      font-size: 0.9rem;
    }
  `],
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authApi = inject(AuthApiService);
  private readonly authStorage = inject(AuthStorageService);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  readonly emailInvalid = computed(() => {
    const control = this.form.controls.email;
    return control.invalid && (control.dirty || control.touched);
  });

  readonly passwordInvalid = computed(() => {
    const control = this.form.controls.password;
    return control.invalid && (control.dirty || control.touched);
  });

  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.authApi.login(this.form.getRawValue()).subscribe({
      next: (token) => {
        this.authStorage.setToken(token);
        window.location.href = POST_LOGIN_REDIRECT_URL;
      },
      error: (error) => {
        this.loading.set(false);
        this.errorMessage.set(
          error?.error?.message ??
            error?.error?.errors?.[0]?.message ??
            'Échec de l’authentification.',
        );
      },
    });
  }

  loginWithSso(): void {
    window.location.href = this.authApi.getSsoRedirectUrl();
  }
}
