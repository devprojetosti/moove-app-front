import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@service/core/auth.service';
import { ServicosService } from '@service/core/servicos.service';
import { HttpCrudService } from '@shared/http-crud.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { Usuario } from './usuario.interface';

@Injectable()
export class 
UsuarioService extends HttpCrudService {

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

  public search(first, rows, sortField, sortOrder, filtro?): Observable<Usuario[]> {
    const url = `${this.baseUrl}/usuario`;
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

  public findOne(id): Observable<Usuario> {
    const url = `${this.baseUrl}/usuario/findById/` + id;
    console.log(url);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    return this.http
    .get<any>(url, { 'headers': headers});
  }

  public pesquisar(filter): Observable<Usuario[]> {
    const url = `${this.baseUrl}/usuario/pesquisar`;
    return this.http
      .get(url, filter)
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err, () => this.pesquisar(filter)))
      );
  }

  public findNext(): Observable<number> {
    const url = `${this.baseUrl}/usuario/next`;
    return this.http
      .get(url)
      .pipe(
        catchError(err => this.handleError(err, () => this.findNext()))
      );
  }

  public findAll(): Observable<any[]> {
    const url = `${this.baseUrl}/usuario/findAll`;
    console.log(url);
    return this.http
      .get(url)
      .pipe(
        catchError(err => this.handleError(err, () => this.findAll()))
      );
  }

  public save(body: Usuario) {
    const url = `${this.baseUrl}/usuario`;
    return this.http
      .put(url, body)
      .pipe(
        shareReplay(1),
        catchError(err => this.handleError(err, () => this.save(body)))
      );
  }
  
  public findAllConsultores(): Observable<any[]> {
    const url = `${this.baseUrl}/usuario/findAllConsultores`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    return this.http
    .get<any>(url, { 'headers': headers});
  }

  public remove(codigo: number) {
    const url = `${this.baseUrl}/usuario/` + codigo;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http
    .delete<any[]>(url, { 'headers': headers});
  }

  getAll() {
    return this.http.get<Usuario[]>(`${this.baseUrl}/users`);
  }

  register(user: Usuario) {
      return this.http.post(`${this.baseUrl}/users/register`, user);
  }

  delete(id: number) {
      return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

}
