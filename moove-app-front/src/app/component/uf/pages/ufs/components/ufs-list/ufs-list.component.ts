import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { AuthService } from 'src/app/service/core/auth.service';
import { PageBase } from 'src/app/shared/page-base';
import { UfService } from 'src/app/component/uf/services/uf.service';
import { AlertaService } from 'src/app/service/core/alerta.service';

@Component({
  selector: 'app-temas-list',
  templateUrl: './temas-list.component.html',
  styleUrls: ['./temas-list.component.css'],
  providers: [AuthService]
})
export class UfsListComponent extends PageBase implements OnInit {

  cols = [
    { field: 'nome', header: 'Nome', sortable: true, styleClass: 'nome' },
    { field: 'sigla', header: 'Sigla', sortable: true, styleClass: 'sigla' }
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
    public ufService: UfService,
    public auth: AuthService,
    private confirmationService: ConfirmationService) {
    super(alertaService);
    this.sortField = 'nome';
    this.sortOrder = 1;
  }

  ngOnInit() {
    this.sortField = 'nome';
    this.sortOrder = 1;
    this.load({
      first: 0,
      rows: 10,
      sortField: this.sortField,
      sortOrder: this.sortOrder
    }, this.filterValues);
  }

  remove(id, index) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão?',
      accept: () => {
        this.confirmarRemocao(id, index);
      }
    });
  }

  private confirmarRemocao(id: number, index: number) {
    this.ufService.remover(id).subscribe(
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
    this.ufService
      .search(event.first, event.rows, event.sortField, event.sortOrder, filtro)
      .subscribe(
        res => {
          this.data = res['content'];
          this.totalElements = res['totalElements'];
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