import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { PedidosFilterComponent } from './pages/pedidos/components/pedidos-filter/pedidos-filter.component';
import { FormComponentBase } from '@shared/form-component-base';
import { FormsModule } from '@angular/forms';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { PedidosListComponent } from './pages/pedidos/components/pedidos-list/pedidos-list.component';
import { PedidosRoutes } from './pedido.routing';
import { PedidoAcompanhamentoComponent } from './pages/pedido-acompanhamento/pedido-acompanhamento.component';
import { PedidoAdiarComponent } from './pages/pedido-acompanhamento/pedido-adiar/pedido-adiar.component';
import { RelatorioEsquadriasComponent } from './pages/relatorio-esquadrias/relatorio-esquadrias.component';
import { RelatorioClientesComponent } from './pages/relatorio-clientes/relatorio-clientes.component';

const routes: Routes = [
  {
      path: '',
      data: {
          title: 'Pedidos',
          urls: [
              { title: 'Pedidos', url: '/pedidos' }
          ]
      },

      component: PedidosComponent 
  },
  {
    path: 'pedidos/edit',
    component: PedidoComponent
  },
  {
    path: 'pedidos/relatorioesquadriascliente',
    component: RelatorioEsquadriasComponent
  },
  {
    path: 'pedidos/relatorioclientes',
    component: RelatorioClientesComponent
  },
  {
    path: 'pedidos/acompanhamentopedidos',
    component: PedidoAcompanhamentoComponent
  },
  {
    path: 'pedidos/edit/:id',
    component: PedidoComponent,
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
    PedidoComponent,
    PedidosComponent,
    PedidosListComponent,
    PedidosFilterComponent,
    PedidoAcompanhamentoComponent,
    PedidoAdiarComponent,
    RelatorioEsquadriasComponent,
    RelatorioClientesComponent
    ]
})
export class PedidosModule { }
