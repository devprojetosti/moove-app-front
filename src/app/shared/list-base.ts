import { OnInit, Optional } from '@angular/core';
import { ConfirmationService, SortEvent } from 'primeng/api';
import * as moment from 'moment';
import { PageBase } from './page-base';
import { AlertaService } from '../service/core/alerta.service';
import { HttpCrudService } from './http-crud.service';
import { Genero } from './enum/genero.enum';

export class ListBase extends PageBase implements OnInit {
  itens = [];
  cols: { field: string; header: string, styleClass: string }[];
  dadosCadastroCols = [
    // { field: 'nomeUsuarioCadastro', header: 'Responsável Cadastrado', styleClass: '' },
    // { field: 'dataCadastro', header: 'Data Cadastro', styleClass: '' },
    // { field: 'nomeUsuarioAtualizacao', header: 'Responsável Atualzação', styleClass: '' },
    { field: 'dataAtualizacao', header: 'Data Atualzação', styleClass: 'column-data center' }
  ];

  constructor(
    protected alertaService: AlertaService,
    protected confirmationService: ConfirmationService,
    protected service: HttpCrudService,
    public nome: string,
    @Optional() private genero: string = Genero.masculino
  ) {
    super(alertaService);
  }

  ngOnInit() {
    this.listar();
    this.setBreadcrumb();
    this.setColumns();
  }

  protected listar() {
    this.service.listar().subscribe(
      res => {
        this.itens = res;
      },
      err => {
        this.handleErrorAlert(err);
      }
    );
  }

  remover(codigo, index) {
    this.confirmationService.confirm({
      message: `Deseja remover est${
        this.genero === Genero.masculino ? 'e' : 'a'
      } ${this.nome.toLowerCase()}?`,
      accept: () => {
        this.confirmarRemocao(codigo, index);
      }
    });
  }

  copiar(codigo: number) {
    this.service.copiar(codigo).subscribe(
      res => {
        this.alertaService.showSuccess(
          `${this.nome} Copiad${
            this.genero === Genero.masculino ? 'o' : 'a'
          } com Sucesso`
        );
        this.listar();
      },
      err => {
        this.handleErrorAlert(err);
      }
    );
  }

  protected confirmarRemocao(codigo: number, index: number) {
    this.service.remover(codigo).subscribe(
      res => {
        this.alertaService.showSuccess(
          `${this.nome} Removid${
            this.genero === Genero.masculino ? 'o' : 'a'
          } com Sucesso`
        );
        this.removerDaLista(index);
      },
      err => {
        this.handleErrorAlert(err);
      }
    );
  }

  protected removerDaLista(index: number) {
    this.itens.splice(index, 1);
  }

  protected setBreadcrumb() {}

  protected setColumns() {}

  rowTrackBy(index: number, row: any) { return row.codigo; }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (
        moment(value1, 'DD/MM/YYYY HH:mm:ss', true).isValid() &&
        moment(value2, 'DD/MM/YYYY HH:mm:ss', true).isValid()
      ) {
        const date1 = moment(value1, 'DD/MM/YYYY HH:mm:ss');
        const date2 = moment(value2, 'DD/MM/YYYY HH:mm:ss');
        result = date1.isBefore(date2) ? -1 : date1.isAfter(date2) ? 1 : 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }
      return event.order * result;
    });
  }
}
