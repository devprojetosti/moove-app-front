import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { AuthService } from '@service/core/auth.service';
import { PageBase } from '@shared/page-base';
import { AlertaService } from '@service/core/alerta.service';
import { UfService } from 'app/component/uf/services/uf.service';
import { PedidoService } from 'app/component/pedido/services/pedido.service';
import { ClienteService } from 'app/component/cliente/services/cliente.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css'],
  providers: []
})
export class ClientesListComponent extends PageBase implements OnInit {

  cols = [
    { field: 'nome', header: 'Nome', sortable: true, styleClass: 'nome' },
    { field: 'cpf', header: 'CPF', sortable: true, styleClass: 'nome' },
    { field: 'cnpj', header: 'CNPJ', sortable: true, styleClass: 'nome' }
  ];

  data = [];
  loading: boolean;
  totalElements: number;
  sortField: string;
  sortOrder: number;
  filterValues: any;

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
    public clienteService: ClienteService,
    public authService: AuthService,
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
    this.clienteService.remove(id).subscribe(
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
    this.clienteService
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

}
