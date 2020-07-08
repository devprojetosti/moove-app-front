import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Observable, BehaviorSubject } from 'rxjs';
import { ServicosService } from './servicos.service';
import { Usuario } from 'app/component/usuario/services/usuario.interface';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuario: any;
  public colaborador: any;
  public menus: any;
  public access_token: string;
  private baseUrl;
  public alteracaoSenha = { senhaAtual: null, login: null };
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;
  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(
    public router: Router,
    public http: HttpClient,
    public servicos: ServicosService,
    ) {
    this.baseUrl = `${environment.baseUrl}`;
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  private createSessao() {
    console.log('ab');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.menus = JSON.parse(localStorage.getItem('menus'));
    this.access_token = localStorage.getItem('access_token');
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value; 
}

  login(username, password) {
    console.log('teste');
    const url = `${this.baseUrl}/usuario/autenticar`
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    const params = { login: username, senha: password };
    return this.http
      .get<any>(url, { 'headers': headers, 'params': params })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })); 
   /* return this.http
    .post<any>(url, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        })); */
}

logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
  console.log(localStorage.getItem('currentUser'));
  console.log(this.currentUserSubject)
  console.log(this.currentUserValue)
  this.router.navigate(['/login']);
  console.log('ab');
}

  refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    const urlRefreshTokenSistema =
      this.servicos.urls.urlBaseApiAutenticacao +
      '/oauth2/token?grant_type=refresh_token&client_id=aWRhcHBjbGllbnRlNzA5MTIyMDE' +
      '&client_secret=c2VjcmV0YXBwY2xpZW50ZTcwOTEyMjAxNg&refresh_token={refresh_token}'.replace(
        '{refresh_token}',
        refreshToken
      );
    return this.http.post<any>(urlRefreshTokenSistema, null, this.headers).pipe(
      tap(res => {
        this.access_token = res.access_token;
        this.saveToken(res);
      })
    );
  }

  alterarSenha(request: any, login: string) {
    const urlAlteracaoSenha = this.servicos.urls.urlAlteracaoSenha.replace(
      '{login}',
      login
    );
    return this.http.put(urlAlteracaoSenha, request);
  }

  alterarImagem(foto: any) {
    const urlAlteracaoFoto =
      this.servicos.urls.urlPesquisaUsuarios + this.usuario.id + '/foto';
    return this.http.put(urlAlteracaoFoto, foto);
  }

  recuperarSenha(login: string) {
    const urlRecuperacaoSenha = this.servicos.urls.urlRecuperacaoSenha.replace(
      '{login}',
      login
    );
    return this.http.post(urlRecuperacaoSenha, null, this.headers);
  }

  configurarSessao(sessao: any, lembrar: boolean = false) {
    this.usuario = sessao.usuario;
    this.menus = sessao.menus;
    this.access_token = sessao.access_token;
    // this.configurarColaborador();
    if (lembrar) {
      this.saveSession(sessao);
    }
  }

  configurarColaborador(): Observable<void> {
    return new Observable<void>(
      observer => {
        this.servicos.buscarUrls().subscribe(
          urls => {
            this.http.get<any[]>(
              `${urls.urlBaseApiBasi}/v1/rh/colaboradores/${this.usuario.email}`,
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + this.access_token
                }
              }
            ).subscribe(
              colaboradores => {
                if (!isNullOrUndefined(colaboradores) && colaboradores.length === 1) {
                  this.colaborador = colaboradores[0];
                }
              },
              err => (console.log(err)),
              () => {
                observer.next();
                observer.complete();
              }
            );
          }
        );
      }
    );
  }

  saveSession(sessao: any) {
    this.saveToken(sessao);
    console.log('sessao', sessao);
    localStorage.setItem('usuario', JSON.stringify(sessao.usuario));
    localStorage.setItem('menus', JSON.stringify(sessao.menus));
  }
  
  private saveToken(sessao: any) {
    console.log('sessao', sessao);
    localStorage.setItem('access_token', sessao.access_token);
    localStorage.setItem('token_type', sessao.token_type);
    localStorage.setItem('expires_in', sessao.expires_in);
    localStorage.setItem('refresh_token', sessao.refresh_token);
  }

}
