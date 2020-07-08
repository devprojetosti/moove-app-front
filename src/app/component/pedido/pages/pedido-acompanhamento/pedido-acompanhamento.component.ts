import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { AuthService } from '@service/core/auth.service';
import { PageBase } from '@shared/page-base';
import { AlertaService } from '@service/core/alerta.service';
import { UfService } from 'app/component/uf/services/uf.service';
import { PedidoService } from 'app/component/pedido/services/pedido.service';
import { EtapaPedidoService } from '../../services/etapa-pedido.service';

@Component({
  selector: 'app-pedido-acompanhamento',
  templateUrl: './pedido-acompanhamento.component.html',
  styleUrls: ['./pedido-acompanhamento.component.css'],
  providers: [PedidoService, AlertaService, ConfirmationService, EtapaPedidoService]
})
export class PedidoAcompanhamentoComponent extends PageBase implements OnInit {

  cols = [
    { field: 'pedido.pedido', header: 'Número do Pedido', sortable: true, styleClass: 'sigla' },
    { field: 'pedido.cliente.nome', header: 'Nome do Cliente', sortable: true, styleClass: 'sigla' },
    { field: 'etapa', header: 'Etapa', sortable: true, styleClass: 'sigla' },
    { field: 'dataConclusao', header: 'Data de Conclusão', sortable: true, styleClass: 'sigla' },
    { field: 'concluido', header: 'Concluído', sortable: true, styleClass: 'sigla' },
  ];

  data = [];
  loading: boolean;
  mostraAdiarEtapa: boolean;
  idSelected: number;
  etapaAdiar: any;
  dataAdiar: Date;
  indexSelected: number;
  totalElements: number;
  sortField: string;
  motivo: string;
  novaData: Date;
  novaDescricao: string;
  sortOrder: number;
  filterValues: any;
  formBuilder: any;
  concluir: boolean = false;
  cancelarConclusao: boolean = false;
  form: any;

  @Input()
  set filtro(value) {
    this.sortField = 'nome';
    this.sortOrder = 1;
    this.filterValues = value;
    this.load({
      first: 0,
      rows: 10,
      sortField: this.sortField,
      sortOrder: this.sortOrder
    }, this.filterValues);
  }

  constructor(
    protected alertaService: AlertaService,
    public pedidoService: PedidoService,
    public auth: AuthService,
    public etapaPedidoService: EtapaPedidoService,
    private confirmationService: ConfirmationService) {
    super(alertaService);
    this.sortField = 'nome';
    this.sortOrder = 1;
  }

  ngOnInit() {
    this.sortField = 'nome';
    this.sortOrder = 1;
    this.lazyLoad;
  }

  remove(id, index) {
    console.log('id', id);
    console.log('index', index);
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      accept: () => {
        this.confirmarRemocao(id, index);
      }
    });
  }

  private confirmarRemocao(id: number, index: number) {
    this.pedidoService.remove(id).subscribe(
      res => {
        this.alertaService.showSuccess('Exclusão concluída');
        this.data.splice(index, 1);
        this.ngOnInit();
      },
      err => {
        this.handleErrorAlert(err);
      }
    );

  }

  lazyLoad(event: LazyLoadEvent) {
    this.load(event, this.filterValues);
  }

  load(event: any, filtro) {
    console.log('event');
    this.etapaPedidoService
      .search(event.first, event.rows, event.sortField, event.sortOrder, filtro)
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

  adiarEtapa(id, dataConclusao, index) {
    let etapa: any;
    this.etapaPedidoService.findOne(id).subscribe(
      data => {
        this.etapaAdiar = data;
        console.log('etapaAdiar', this.etapaAdiar);
        this.mostraAdiarEtapa = true;
      },
      err => {
        this.handleErrorAlert(err);
      }
    );
  }

  fecharAdiar(id, dataConclusao, index) {
    this.mostraAdiarEtapa = false;
    this.idSelected = id;
    this.indexSelected = index;
  }

  confirmarAdiarEtapa(novaData, novaDescricao) {
    console.log('novaData', novaData);
    console.log('novaDescricao', novaDescricao);
    console.log('novaData', this.novaData);
    console.log('novaDescricao', this.novaDescricao);
    console.log('form', this.form);
  }

  concluirEtapa(id, concluido, index) {
    console.log(id);
    if(concluido === 'NAO'){
      this.concluir = true;
    } else if (concluido === 'SIM'){
      this.cancelarConclusao = true;
    }
    this.idSelected = id;
    this.indexSelected = index;
  }

  confirmarConcluirEtapa() {
    this.etapaPedidoService.concluir(this.idSelected).subscribe(
      () => {
        this.alertaService.showSuccess('Etapa alterada');
        this.data.splice(this.indexSelected, 1);
        this.ngOnInit();
      },
      err => {
        this.handleErrorAlert(err);
      }
    );
    this.idSelected = null;
    this.indexSelected = null;
    this.concluir = false;
    this.cancelarConclusao = false;
  }

  voltaAdiar(etapa: any) {
    console.log(etapa);
    this.mostraAdiarEtapa = false;
    this.lazyLoad;
  }

}
