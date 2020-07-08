import { Component, Input, OnInit } from '@angular/core';
import { AlertaService } from '@service/core/alerta.service';
import { AuthService } from '@service/core/auth.service';
import { PageBase } from '@shared/page-base';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { UsuarioService } from 'app/component/usuario/services/usuario.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css'],
  providers: []
})
export class UsuariosListComponent extends PageBase implements OnInit {

  cols = [
    { field: 'nome', header: 'Nome', sortable: true, styleClass: 'nome' },
    { field: 'cargo', header: 'Função', sortable: true, styleClass: 'funcao' }
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
    public usuarioService: UsuarioService,
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
    this.usuarioService.remove(id).subscribe(
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
    this.usuarioService
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
