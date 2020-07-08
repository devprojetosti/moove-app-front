import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@service/core/auth.service';
import { ServicosService } from '@service/core/servicos.service';
import { HttpCrudService } from '@shared/http-crud.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { Cliente } from './cliente.interface';

@Injectable()
export class 
ClienteService extends HttpCrudService {

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

  public search(first, rows, sortField, sortOrder, filtro?): Observable<Cliente[]> {
    const url = `${this.baseUrl}/cliente`;
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

  public findOne(id): Observable<Cliente> {
    const url = `${this.baseUrl}/cliente/` + id;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    return this.http
    .get<any>(url, { 'headers': headers});
  }

  public findComEtapaAtiva(): Observable<Cliente[]> {
    const url = `${this.baseUrl}/cliente/findComEtapaAtiva`;
    console.log('url', url);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    return this.http
    .get<any>(url, { 'headers': headers});
  }

  public pesquisar(filter): Observable<Cliente[]> {
    const url = `${this.baseUrl}/cliente/pesquisar`;
    return this.http
      .get(url, filter)
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err, () => this.pesquisar(filter)))
      );
  }

  public findNext(): Observable<number> {
    const url = `${this.baseUrl}/cliente/next`;
    return this.http
      .get(url)
      .pipe(
        catchError(err => this.handleError(err, () => this.findNext()))
      );
  }

  public findAll(): Observable<any[]> {
    const url = `${this.baseUrl}/cliente/findAll`;
    console.log(url);
    return this.http
      .get(url)
      .pipe(
        catchError(err => this.handleError(err, () => this.findAll()))
      );
  }
  
  public save(body: Cliente) {
    const url = `${this.baseUrl}/cliente`;
    return this.http
      .put(url, body)
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err, () => this.save(body)))
      );
  }

  public remove(codigo: number) {
    const url = `${this.baseUrl}/cliente/` + codigo;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http
    .delete<any[]>(url, { 'headers': headers});
  }

}
