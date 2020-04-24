import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadChildren: () => import('./component/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'component',
                loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
            },
            {
                path: 'ufs',
                loadChildren: () => import('./component/uf/uf.module').then(m => m.UfsModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];
