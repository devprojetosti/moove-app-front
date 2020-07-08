import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicosService } from '@service/core/servicos.service';
import { HttpCrudService } from '@shared/http-crud.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { Pedido, EtapaPedido, Etapa } from './pedido.interface';
import { AuthService } from '@service/core/auth.service';

@Injectable()
export class 
EtapaPedidoService extends HttpCrudService {

  private locais$;
  baseUrl;

  constructor(
    public http: HttpClient,
    public servicos: ServicosService,
    protected auth: AuthService) {
    super(http, servicos, auth);
    this.baseUrl = `${environment.baseUrl}`;
    console.log('this.baseUrl', this.baseUrl);
  }

  public search(first, rows, sortField, sortOrder, filtro?): Observable<EtapaPedido[]> {
    const url = `${this.baseUrl}/etapapedido`;
    console.log('url', url);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    const params = { first: first, rows: rows, sortField: sortField, sortOrder: sortOrder };
    if (filtro) {
      for (const e in filtro) {
        if (e) {
          params[e] = filtro[e];
        }
      }
    }
    return this.http
      .get<any[]>(url, { 'headers': headers });
  }

  public findOne(id): Observable<EtapaPedido> {
    const url = `${this.baseUrl}/etapapedido/` + id;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    return this.http
    .get<any>(url, { 'headers': headers});
  }

  public pesquisar(filter): Observable<EtapaPedido[]> {
    const url = `${this.baseUrl}/etapapedido/pesquisar`;
    return this.http
      .get(url, filter)
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err, () => this.pesquisar(filter)))
      );
  }

  public findNext(): Observable<number> {
    const url = `${this.baseUrl}/etapapedido/next`;
    return this.http
      .get(url)
      .pipe(
        catchError(err => this.handleError(err, () => this.findNext()))
      );
  }

  public findAll(): Observable<any[]> {
    const url = `${this.baseUrl}/etapapedido/findAll`;
    console.log(url);
    return this.http
      .get(url)
      .pipe(
        catchError(err => this.handleError(err, () => this.findAll()))
      );
  }

  public save(body: EtapaPedido) {
    const url = `${this.baseUrl}/etapapedido`;
    return this.http
      .put(url, body)
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err, () => this.save(body)))
      );
  }

  public adiar(body: EtapaPedido): Observable<EtapaPedido> {
    const url = `${this.baseUrl}/etapapedido/adiar`;
    console.log('url', url)
    return this.http
      .post(url, body)
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err, () => this.adiar(body)))
      );
  }

  public findAllByPedido(id): Observable<any[]> {
    const url = `${this.baseUrl}/etapapedido/findAllByPedido/` + id;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    console.log('url', url)
    return this.http
    .get<any>(url, { 'headers': headers})
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err, () => this.findAllByPedido(url)))
      );
  }

  public remove(codigo: number) {
    const url = `${this.baseUrl}/etapapedido/` + codigo;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http
    .delete<any[]>(url, { 'headers': headers});
  }

  public concluir(id: number) {
    const url = `${this.baseUrl}/etapapedido/concluir/` + id;
    console.log('url', url);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    return this.http
    .get(url, { 'headers': headers});
  }

}
