import { TemasRoutes } from '@admin/administracao/temas/temas.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TemasListComponent } from './pages/temas/components/temas-list/temas-list.component';
import { TemasComponent } from './pages/temas/temas.component';
import { TemaComponent } from './pages/tema/tema.component';
import { TemasFilterComponent } from './pages/temas/components/temas-filter/temas-filter.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(TemasRoutes),
  ],
  declarations: [
    TemasComponent,
    TemaComponent,
    TemasListComponent,
    TemasFilterComponent
    ]
})
export class TemasModule { }
