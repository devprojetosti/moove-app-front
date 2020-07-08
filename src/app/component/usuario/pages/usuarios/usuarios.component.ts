import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@service/core/auth.service';
import { ConfirmationService } from 'primeng/api';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService, ConfirmationService]
})
export class UsuariosComponent implements OnInit {

  public filtro: any;

  constructor(private router: Router, public auth: AuthService) {
  }

  filtrar(filtro: any) {
    this.filtro = filtro;
  }

  ngOnInit(){

  }

}
