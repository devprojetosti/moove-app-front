import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ServicosService } from '../service/core/servicos.service';
import { AuthService } from '../service/core/auth.service';

@Injectable()
export abstract class HttpCrudService extends HttpService {
  protected baseUrl;
  error: any[] = [];

  constructor(protected http: HttpClient, protected servicos: ServicosService, protected auth: AuthService) {
    super(http, servicos);
  }

  buscar(codigo: number) {
    const url = this.baseUrl + codigo;
    return this.http.get<any>(url);
  }

  listar() {
    const url = this.baseUrl;
    return this.http.get<any>(url).pipe(tap(this.converterDadosUsuarios));
  }

  copiar(codigo) {
    const url = this.baseUrl + codigo + '/copias';
    return this.http.post<any>(url, null);
  }

  desativar(codigo) {
    const url = this.baseUrl + codigo + '/desativados';
    return this.http.put<any>(url, null);
  }

  criar(item: any) {
    const url = this.baseUrl;
    return this.http.post<any>(url, item);
  }

  atualizar(codigo: number, item: any) {
    const url = this.baseUrl + codigo;
    return this.http.put<any>(url, item);
  }

  salvar(itens: any) {
    const url = this.baseUrl;
    return this.http.put<any>(url, itens);
  }

  remover(codigo: number) {
    const url = this.baseUrl + codigo;
    return this.http.delete<any>(url);
  }

  converterDadosUsuarios(itens: any[]) {
    itens.forEach(item => {
      if (!item.nomeUsuarioCadastro && item.responsavelCadastro) {
        item.nomeUsuarioCadastro = item.responsavelCadastro.nome;
      }
      if (!item.nomeUsuarioAtualizacao && item.responsavelAtualizacao) {
        item.nomeUsuarioAtualizacao = item.responsavelAtualizacao.nome;
      }
    });
  }

  protected handleError(error: any, callback: () => Observable<any>) {
    console.error(error);
    if (error.status === 401) { // Token expired
      return this.auth.refreshToken().pipe(
        switchMap((res: any) => {
          return callback();
        }),
        catchError(err => (Observable.throw(err)) )
      );
    } else {
      return Observable.throw(error);
    }
  }


}
