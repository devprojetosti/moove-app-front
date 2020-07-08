import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertaService } from '@service/core/alerta.service';
import { AuthService } from '@service/core/auth.service';
import { FormBase } from '@shared/form-base';
import { ClienteService } from 'app/component/cliente/services/cliente.service';

@Component({
  selector: 'app-clientes-filter',
  templateUrl: './clientes-filter.component.html',
  styleUrls: ['./clientes-filter.component.css']
})
export class ClientesFilterComponent extends FormBase implements OnInit {

  nome: { label: string, value: string }[] = [

  ];


  @Output() filtro = new EventEmitter<any>();

  constructor(
    public auth: AuthService,
    public clienteService: ClienteService,
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
