import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public-layout.component';
import { PrivateLayoutComponent } from './private-layout.component';

export const BASE_ROUTES: Routes = [
  {
    path: 'login',
    component: PublicLayoutComponent,
    children: []
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    children: []
  }
];

export const routes: Routes = [];
