import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from '@service/core/auth-guard.service';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

export const Approutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: 'a', component: HomeComponent, canActivate: [AuthGuard] 
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./component/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]
            },
            {
                path: 'component',
                loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule), canActivate: [AuthGuard]
            },
            {
                path: 'ufs',
                loadChildren: () => import('./component/uf/uf.module').then(m => m.UfsModule), canActivate: [AuthGuard]
            },
            {
                path: 'pedidos',
                loadChildren: () => import('./component/pedido/pedido.module').then(m => m.PedidosModule), canActivate: [AuthGuard]
            },
            {
                path: 'usuarios',
                loadChildren: () => import('./component/usuario/usuario.module').then(m => m.UsuariosModule), canActivate: [AuthGuard]
            },
            {
                path: 'clientes',
                loadChildren: () => import('./component/cliente/cliente.module').then(m => m.ClientesModule), canActivate: [AuthGuard]
            },
            {
                path: 'login', component: LoginComponent 
            },
            {
                path: 'register', component: RegisterComponent 
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        canActivate: [AuthGuard]
    }
];

export const appRoutingModule = RouterModule.forRoot(Approutes);