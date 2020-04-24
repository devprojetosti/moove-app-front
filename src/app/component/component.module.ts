import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { SharedModule } from '../shared/shared.module';
import { FullComponent } from 'app/layouts/full/full.component';

@NgModule({
  imports: [
    RouterModule.forChild(ComponentsRoutes)
  ],
  declarations: [
  ]
})
export class ComponentsModule {}
