import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { FormBase } from '@shared/form-base';
import { AuthService } from '@service/core/auth.service';
import { AlertaService } from '@service/core/alerta.service';
import { PedidoService } from 'app/component/pedido/services/pedido.service';
import { LazyLoadEvent, SelectItem } from 'primeng';
import { EtapaPedidoService } from '../../services/etapa-pedido.service';
import { ClienteService } from 'app/component/cliente/services/cliente.service';

@Component({
  selector: 'app-relatorio-clientes',
  templateUrl: './relatorio-clientes.component.html',
  styleUrls: ['./relatorio-clientes.component.css'],
  providers: [PedidoService, ClienteService, PedidoService]
})
export class RelatorioClientesComponent extends FormBase implements OnInit {

  nome: { label: string, value: string }[] = [

  ];
  cols = [
    { field: 'pedido', header: 'Número do Pedido', sortable: true, styleClass: 'nome' },
    { field: 'usuario.nome', header: 'Consultor Responsável', sortable: true, styleClass: 'nome' },
    { field: 'cliente.nome', header: 'Cliente', sortable: true, styleClass: 'nome' },
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
    public clienteService: ClienteService
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
      pedido: [null]
    });
  }

  lazyLoad(event: LazyLoadEvent) {
    this.load();
  }

  load() {
    this.pedidoService
      .findComEtapaAtiva()
      .subscribe(
        res => {
          this.data = res;
          this.totalElements = res.length;
          console.log(this.data);
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
