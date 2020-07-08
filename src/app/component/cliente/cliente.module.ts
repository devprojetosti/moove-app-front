import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClientesListComponent } from './pages/clientes/components/clientes-list/clientes-list.component';
import { ClientesFilterComponent } from './pages/clientes/components/clientes-filter/clientes-filter.component';
import { ClientesRoutes } from './cliente.routing';

const routes: Routes = [
  {
      path: '',
      data: {
          title: 'Clientes',
          urls: [
              { title: 'Clientes', url: '/clientes' }
          ]
      },

      component: ClientesComponent 
  },
  {
    path: 'clientes/edit',
    component: ClienteComponent
  },
  {
    path: 'clientes/edit/:id',
    component: ClienteComponent,
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
    ClienteComponent,
    ClientesComponent,
    ClientesListComponent,
    ClientesFilterComponent
    ]
})
export class ClientesModule { }
