import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@service/core/auth.service';
import { ConfirmationService } from 'primeng/api';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClienteService, ConfirmationService]
})
export class ClientesComponent implements OnInit {

  public filtro: any;

  constructor(private router: Router, public auth: AuthService) {
  }

  filtrar(filtro: any) {
    this.filtro = filtro;
  }

  ngOnInit(){

  }

}
