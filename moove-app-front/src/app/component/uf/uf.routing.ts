import { Routes } from '@angular/router';
import { UfsComponent } from './pages/ufs/ufs.component';
import { UfComponent } from './pages/uf/uf.component';

export const UfsRoutes: Routes = [
  {
    path: 'ufs',
    component: UfsComponent
  },
  {
    path: 'ufs/edit/:id',
    component: UfComponent,
    data: { action: 'edit' }
  },
  {
    path: 'ufs/view/:id',
    component: UfComponent,
    data: { action: 'view' }
  },
  {
    path: 'ufs/edit',
    component: UfComponent
  }
];
