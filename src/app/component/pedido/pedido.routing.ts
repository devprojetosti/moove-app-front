import { Routes } from '@angular/router';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { PedidoAcompanhamentoComponent } from './pages/pedido-acompanhamento/pedido-acompanhamento.component';
import { RelatorioEsquadriasComponent } from './pages/relatorio-esquadrias/relatorio-esquadrias.component';
import { RelatorioClientesComponent } from './pages/relatorio-clientes/relatorio-clientes.component';
export const PedidosRoutes: Routes = [
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'pedidos/edit/:id',
    component: PedidoComponent,
    data: { action: 'edit' }
  },
  {
    path: 'pedidos/view/:id',
    component: PedidoComponent,
    data: { action: 'view' }
  },
  {
    path: 'pedidos/edit',
    component: PedidoComponent
  },
  {
    path: 'pedidos/acompanhamentopedidos',
    component: PedidoAcompanhamentoComponent
  },
  {
    path: 'pedidos/relatorioesquadriascliente',
    component: RelatorioEsquadriasComponent
  },
  {
    path: 'pedidos/relatorioclientes',
    component: RelatorioClientesComponent
  }
];
