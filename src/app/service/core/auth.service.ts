import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';
import { ServicosService } from './servicos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuario: any;
  public colaborador: any;
  public menus: any;
  public access_token: string;
  public alteracaoSenha = { senhaAtual: null, login: null };
  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(
    public router: Router,
    public http: HttpClient,
    public servicos: ServicosService
  ) {
    this.createSessao();
  }

  private createSessao() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.menus = JSON.parse(localStorage.getItem('menus'));
    this.access_token = localStorage.getItem('access_token');
  }

  login(login: string, senha: string, lembrar: boolean = false) {
    const urlAutenticacaoSistema = this.servicos.urls.urlAutenticacaoSistema
      .replace('{login}', login)
      .replace('{senha}', encodeURIComponent(senha));
    return this.http.post(urlAutenticacaoSistema, null, this.headers).pipe(
      tap(res => {
        this.configurarSessao(res, lembrar);
      })
    );
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
    localStorage.setItem('usuario', JSON.stringify(sessao.usuario));
    localStorage.setItem('menus', JSON.stringify(sessao.menus));
  }

  private saveToken(sessao: any) {
    localStorage.setItem('access_token', sessao.access_token);
    localStorage.setItem('token_type', sessao.token_type);
    localStorage.setItem('expires_in', sessao.expires_in);
    localStorage.setItem('refresh_token', sessao.refresh_token);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menus');
    this.router.navigate(['/login']);
  }
}
