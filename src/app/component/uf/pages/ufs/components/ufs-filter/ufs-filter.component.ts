import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { FormBase } from '@shared/form-base';
import { AuthService } from '@service/core/auth.service';
import { UfService } from 'app/component/uf/services/uf.service';
import { AlertaService } from '@service/core/alerta.service';

@Component({
  selector: 'app-ufs-filter',
  templateUrl: './ufs-filter.component.html',
  styleUrls: ['./ufs-filter.component.css']
})
export class UfsFilterComponent extends FormBase implements OnInit {

  nome: { label: string, value: string }[] = [

  ];


  @Output() filtro = new EventEmitter<any>();

  constructor(
    public auth: AuthService,
    public ufService: UfService,
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
