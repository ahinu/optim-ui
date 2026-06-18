import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page.component';
import { SsoCallbackSuccessPageComponent } from './pages/sso-callback-success-page.component';
import { SsoCallbackErrorPageComponent } from './pages/sso-callback-error-page.component';

/*
 * ================================
 * Optim Portal (Sibylle project)
 *      └── MFE Login
 * 
 * @purpose: Routage vers les differents component du login (local,sso,callback)
 * ================================
 */

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'callback-success',
    component: SsoCallbackSuccessPageComponent,
  },
  {
    path: 'callback-error',
    component: SsoCallbackErrorPageComponent,
  },
];
