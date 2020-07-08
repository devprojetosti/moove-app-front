import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { FormBase } from '@shared/form-base';
import { AuthService } from '@service/core/auth.service';
import { AlertaService } from '@service/core/alerta.service';
import { PedidoService } from 'app/component/pedido/services/pedido.service';
import { UsuarioService } from 'app/component/usuario/services/usuario.service';

@Component({
  selector: 'app-usuarios-filter',
  templateUrl: './usuarios-filter.component.html',
  styleUrls: ['./usuarios-filter.component.css']
})
export class UsuariosFilterComponent extends FormBase implements OnInit {

  nome: { label: string, value: string }[] = [

  ];


  @Output() filtro = new EventEmitter<any>();

  constructor(
    public authService: AuthService,
    public usuarioService: UsuarioService,
    protected formBuilder: FormBuilder,
    protected alertaService: AlertaService
  ) {
    super(formBuilder, alertaService);
  }

  ngOnInit() {
    this.setForm();
    this.filtrar();
  }

  limpar() {
    this.setForm();
    this.filtro.emit(this.form.value);
  }

  filtrar() {
    if (this.form.invalid) {
      this.alertaService.showWarn('Selecione pelo menos um filtro');
      return;
    } else {
      const filter = this.form.value;
      this.prepareFilter(filter);
      this.filtro.emit(filter);
    }
  }

  private setForm() {
    this.form = this.formBuilder.group({
      nome: [null],
      sigla: [null]
    });
  }

}
