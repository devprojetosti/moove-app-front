import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuariosFilterComponent } from './pages/usuarios/components/usuarios-filter/usuarios-filter.component';
import { UsuariosListComponent } from './pages/usuarios/components/usuarios-list/usuarios-list.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuariosRoutes } from './usuario.routing';

const routes: Routes = [
  {
      path: '',
      data: {
          title: 'Usuarios',
          urls: [
              { title: 'Usuarios', url: '/usuarios' }
          ]
      },

      component: UsuariosComponent 
  },
  {
    path: 'usuarios/edit',
    component: UsuarioComponent
  },
  {
    path: 'usuarios/edit/:id',
    component: UsuarioComponent,
    data: { action: 'edit' }
  }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    UsuarioComponent,
    UsuariosComponent,
    UsuariosListComponent,
    UsuariosFilterComponent
    ]
})
export class UsuariosModule { }
