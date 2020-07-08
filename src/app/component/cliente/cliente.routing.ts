import { Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

export const ClientesRoutes: Routes = [
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'clientes/edit/:id',
    component: ClienteComponent,
    data: { action: 'edit' }
  },
  {
    path: 'clientes/view/:id',
    component: ClienteComponent,
    data: { action: 'view' }
  },
  {
    path: 'clientes/edit',
    component: ClienteComponent
  }
];
