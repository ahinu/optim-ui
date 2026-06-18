import { initFederation } from '@angular-architects/native-federation';

/*
 * ================================
 * Optim Portal (Sibylle project)
 *      └── MFE Login
 * 
 * @purpose: Micro-FrontEnd de gestion du login (DB & SSO)
 * ainsi que de la recuperation et mise en cache du bearer token
 * ================================
 */

initFederation({ 'mfe-login': './remoteEntry.json' })
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
