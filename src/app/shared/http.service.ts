import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ServicosService } from '../service/core/servicos.service';

@Injectable()
export abstract class HttpService {
  protected baseUrl: any;
  constructor(
    protected http: HttpClient,
    protected servicos: ServicosService
  ) {}

  listarDropdownCodigoPerfil() {
    return this.listar().pipe(map(this.criarDropdownCodigoPerfil));
  }

  listarDropdownCodigo() {
    return this.listar().pipe(map(this.criarDropdownCodigo));
  }

  listarDropdown() {
    return this.listar().pipe(map(this.criarDropdown));
  }

  listar() {
    return of([]);
  }

  protected criarDropdown(itens: any[]) {
    return itens.map(item => {
      return {
        label: item.nome || item.descricao,
        value: item
      };
    });
  }

  protected criarDropdownCodigo(itens: any[]) {
    return itens.map(item => {
      return {
        label: item.nome || item.descricao,
        value: item.codigo
      };
    });
  }

  protected criarDropdownCodigoPerfil(itens: any[]) {
    return itens.map(item => {
      return {
        label: item.descricao,
        value: item
      };
    });
  }
}
