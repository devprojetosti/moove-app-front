import { Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

export const UsuariosRoutes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'usuarios/edit/:id',
    component: UsuarioComponent,
    data: { action: 'edit' }
  },
  {
    path: 'usuarios/view/:id',
    component: UsuarioComponent,
    data: { action: 'view' }
  },
  {
    path: 'usuarios/edit',
    component: UsuarioComponent
  }
];
