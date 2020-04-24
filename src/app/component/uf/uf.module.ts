import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UfsComponent } from './pages/ufs/ufs.component';
import { UfsListComponent } from './pages/ufs/components/ufs-list/ufs-list.component';
import { UfsFilterComponent } from './pages/ufs/components/ufs-filter/ufs-filter.component';
import { FormComponentBase } from '@shared/form-component-base';
import { UfComponent } from './pages/uf/uf.component';
import { UfsRoutes } from './uf.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(UfsRoutes),
    FormsModule
  ],
  declarations: [
    UfComponent,
    UfsComponent,
    UfsListComponent,
    UfsFilterComponent
    ]
})
export class UfsModule { }
