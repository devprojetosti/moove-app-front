import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '@service/core/auth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  providers: [PedidoService, ConfirmationService]
})
export class PedidosComponent implements OnInit {

  public filtro: any;

  constructor(private router: Router, public auth: AuthService) {
  }

  filtrar(filtro: any) {
    this.filtro = filtro;
  }

  ngOnInit(){

  }

}
