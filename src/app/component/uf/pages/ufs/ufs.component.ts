import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { UfService } from '../../services/uf.service';
import { AuthService } from 'src/app/service/core/auth.service';

@Component({
  selector: 'app-ufs',
  templateUrl: './ufs.component.html',
  styleUrls: ['./temas.component.css'],
  providers: [UfService, ConfirmationService]
})
export class UfsComponent implements OnInit {

  public filtro: any;

  constructor(private router: Router, public auth: AuthService) {
  }

  filtrar(filtro: any) {
    this.filtro = filtro;
  }

  ngOnInit(){

  }

}
