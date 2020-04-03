import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpCrudService } from './http-crud.service';
import { ServicosService } from '../service/core/servicos.service';
import { AuthService } from '../service/core/auth.service';

@Injectable()
export abstract class HttpCachedService extends HttpCrudService {
  protected baseUrl: any;
  private cache$;

  constructor(protected http: HttpClient, protected servicos: ServicosService, protected auth: AuthService) {
    super(http, servicos, auth);
  }

  criar(item) {
    const url = this.baseUrl;
    return this.http.post<any>(url, item).pipe(tap((this.cache$ = null)));
  }

  atualizar(codigo, item) {
    const url = this.baseUrl + codigo;
    return this.http.put<any>(url, item).pipe(tap((this.cache$ = null)));
  }

  remover(codigo) {
    const url = this.baseUrl + codigo;
    return this.http.delete<any>(url).pipe(tap((this.cache$ = null)));
  }

  listar() {
    if (!this.cache$) {
      this.cache$ = this.listarCached();
    }
    return this.cache$;
  }

  private listarCached() {
    const url = this.baseUrl;
    return this.http.get<any[]>(url).pipe(
      tap(this.converterDadosUsuarios),
      shareReplay(1) // Cache
    );
  }
}
