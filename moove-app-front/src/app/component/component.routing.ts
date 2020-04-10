import { Routes } from '@angular/router';

export const ComponentsRoutes: Routes = [
	{
    path: '',
    children: [
      { path: '', loadChildren: './uf/uf.module#UfsModule' }
    ]
	}
];
