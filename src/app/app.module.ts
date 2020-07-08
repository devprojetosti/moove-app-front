import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { FullComponent } from './layouts/full/full.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { Approutes, appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { TabView, TabViewModule, CardModule, ConfirmDialogModule } from 'primeng';
import { UfsModule } from './component/uf/uf.module';
import { SharedModule } from '@shared/shared.module';
import { PedidosModule } from './component/pedido/pedido.module';
import { UsuariosModule } from './component/usuario/usuario.module';
import { ClientesModule } from './component/cliente/cliente.module';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AlertaComponent } from './component/alerta.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthService } from '@service/core/auth.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};

@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
        FullComponent,
        NavigationComponent,
        BreadcrumbComponent,
        AlertaComponent,
        SidebarComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        RouterModule.forRoot(Approutes),
        PerfectScrollbarModule,
        ChartsModule,
        TabViewModule,
        UfsModule,
        PedidosModule,
        UsuariosModule,
        ClientesModule,
        CardModule,
        SharedModule,
        ConfirmDialogModule,
        appRoutingModule
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
