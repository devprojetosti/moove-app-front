import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { Uf } from './uf.interface';
import { environment } from 'environments/environment';
import { HttpCrudService } from '@shared/http-crud.service';
import { ServicosService } from '@service/core/servicos.service';
import { AuthService } from '@service/core/auth.service';

@Injectable()
export class 
UfService extends HttpCrudService {

  private locais$;
  baseUrl;

  constructor(
    public http: HttpClient,
    public servicos: ServicosService,
    protected auth: AuthService) {
    super(http, servicos, auth);
    this.baseUrl = `${environment.baseUrl}api-sidi/administracao`;
  }

  public search(first, rows, sortField, sortOrder, filtro?): Observable<Uf[]> {
    const url = `${this.baseUrl}/uf`;
    const params = { first: first, rows: rows, sortField: sortField, sortOrder: sortOrder };
    if (filtro) {
      for (const e in filtro) {
        if (e) {
          params[e] = filtro[e];
        }
      }
    }
    return this.http
      .get<any[]>(url, { 'params': params });
  }

  public findOne(id): Observable<Uf> {
    const url = `${this.baseUrl}/uf/` + id;
    return this.http
      .get(url)
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err, () => this.findOne(id)))
      );
  }

  public pesquisar(filter): Observable<Uf[]> {
    const url = `${this.baseUrl}/uf/pesquisar`;
    return this.http
      .get(url, filter)
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err, () => this.pesquisar(filter)))
      );
  }

  public findNext(): Observable<number> {
    const url = `${this.baseUrl}/uf/next`;
    return this.http
      .get(url)
      .pipe(
        catchError(err => this.handleError(err, () => this.findNext()))
      );
  }

  public save(body: Uf) {
    const url = `${this.baseUrl}/uf`;
    return this.http
      .put(url, body)
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err, () => this.save(body)))
      );
  }

  public remover(codigo: number) {
    const url = `${this.baseUrl}/uf/` + codigo;
    return this.http
      .delete(url)
      .pipe(
        catchError(err => this.handleError(err, () => this.remover(codigo)))
      );
  }

}
