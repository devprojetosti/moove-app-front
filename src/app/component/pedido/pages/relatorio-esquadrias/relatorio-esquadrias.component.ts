import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { FormBase } from '@shared/form-base';
import { AuthService } from '@service/core/auth.service';
import { AlertaService } from '@service/core/alerta.service';
import { PedidoService } from 'app/component/pedido/services/pedido.service';
import { LazyLoadEvent, SelectItem } from 'primeng';
import { EtapaPedidoService } from '../../services/etapa-pedido.service';

@Component({
  selector: 'app-relatorio-esquadrias',
  templateUrl: './relatorio-esquadrias.component.html',
  styleUrls: ['./relatorio-esquadrias.component.css'],
  providers: [PedidoService, EtapaPedidoService]
})
export class RelatorioEsquadriasComponent extends FormBase implements OnInit {

  nome: { label: string, value: string }[] = [

  ];
  cols = [
    { field: 'etapa', header: 'Etapa', sortable: true, styleClass: 'nome' },
    { field: 'concluido', header: 'Concluido', sortable: true, styleClass: 'nome' },
    { field: 'dataConclusao', header: 'Data de Conclusão', sortable: true, styleClass: 'nome' },
    { field: 'descricao', header: 'Descrição', sortable: true, styleClass: 'nome' },
    { field: 'ativo', header: 'Ativo', sortable: true, styleClass: 'nome' },
  ];

  sortField: string;
  sortOrder: number;
  filterValues: any;
  pedidos: SelectItem[] = [];
  data = [];
  loading: boolean;
  mostraAdiarEtapa: boolean;
  idSelected: number;
  etapaAdiar: any;
  dataAdiar: Date;
  indexSelected: number;
  totalElements: number;

  @Output() filtro = new EventEmitter<any>();

  constructor(
    public auth: AuthService,
    public pedidoService: PedidoService,
    protected formBuilder: FormBuilder,
    protected alertaService: AlertaService,
    public etapaPedidoService: EtapaPedidoService
  ) {
    super(formBuilder, alertaService);
  }

  ngOnInit() {
    this.setForm();
    this.filtrar();
    this.populatePedidos();
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
      pedido: [null]
    });
  }

  
  private populatePedidos() {
    this.pedidoService.search(0, 100, 'pedido', 1, {}).subscribe(
      data => {
        console.log('data', data);
        const content = data;
        this.pedidos = content.map(pedido => {
          return {label: pedido.pedido, value: pedido};
        });
        console.log('content', content);
      }
    );
  }

  load() {
    console.log('this.form.controls', this.form.controls.pedido);
    let pedido = this.form.controls.pedido.value.id
    console.log('pedido', pedido);
    this.etapaPedidoService
      .findAllByPedido(pedido)
      .subscribe(
        res => {
          this.data = res;
          console.log('this.data', this.data);
          this.totalElements = res.length;
        },
        err => {
          this.data = [];
          this.totalElements = 0;
          this.handleErrorAlert(err);
        },
        () => {
          this.loading = false;
        }
      );
  }

}
