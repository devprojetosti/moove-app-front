import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertaService } from '@service/core/alerta.service';

import { FormComponentBase } from '@shared/form-component-base';
import { LazyLoadEvent, SelectItemGroup } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { isNullOrUndefined } from 'util';
import { EtapaPedidoService } from 'app/component/pedido/services/etapa-pedido.service';
import { PedidoService } from 'app/component/pedido/services/pedido.service';

@Component({
  selector: 'app-pedido-adiar',
  templateUrl: './pedido-adiar.component.html',
  styleUrls: ['./pedido-adiar.component.css'],
  providers: [EtapaPedidoService, PedidoService]
})
export class PedidoAdiarComponent extends FormComponentBase {

  @ViewChild(Dialog) dialog: Dialog;

  @Input() set etapa(etapa:any) {
    this.etapaSelecionada = etapa;
  }

  visible = false;
  sortField = 'nome';
  sortOrder = 1;
  etapaSelecionada: any;

  @Input('active')
  set active(active: boolean) {
    this.visible = active;
    if (active) {
    } else {

    }
  }

  @Input() restrictions: any;

  @Output()
  select: EventEmitter<any> = new EventEmitter<any>(); 

  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(protected alertaService: AlertaService,
    private pedidoService: PedidoService,
    private etapaPedidoService: EtapaPedidoService,
    protected formBuilder: FormBuilder) {
    super(alertaService);
    this.setForm();
  }

  private setForm() {
    this.form = this.formBuilder.group({
      novaData: [null],
      novaDescricao: [null]
    });
  }

  confirmar() {
    console.log('this.etapaSelecionada', this.etapaSelecionada);
    const etapaNova = this.form.getRawValue();
    console.log('etapaNoav', etapaNova);
    this.etapaSelecionada.dataConclusao = etapaNova.novaData;
    this.etapaSelecionada.descricao = etapaNova.novaDescricao;
    this.etapaPedidoService.adiar(this.etapaSelecionada).subscribe(
      res =>{
        console.log('res', res);
        this.form.controls.novaData.setValue(null);
        this.form.controls.novaDescricao.setValue(null);
        this.selecionar(this.etapaSelecionada);
      }, err => {
        this.handleErrorAlert(err);
      }
    );

  }

  selecionar(value: any) {
    this.etapaSelecionada = null;
    this.select.emit(value);
  }

  cancelar() {
    this.cancel.emit();
  }

  close(event) {
    this.dialog.close(event);
  }

  centerDialog() {
      setTimeout(() => {
      }, 200)
  }

}