import { Routes } from '@angular/router';
import { UfsComponent } from './pages/ufs/ufs.component';
import { UfComponent } from './pages/uf/uf.component';

export const TemasRoutes: Routes = [
  {
    path: 'ufs',
    component: UfsComponent
  },
  {
    path: 'uf/edit/:id',
    component: UfComponent,
    data: { action: 'edit' }
  },
  {
    path: 'uf/view/:id',
    component: UfComponent,
    data: { action: 'view' }
  },
  {
    path: 'uf/edit',
    component: UfComponent
  }
];
