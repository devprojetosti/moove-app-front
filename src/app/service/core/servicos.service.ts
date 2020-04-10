import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  public urls: any = {};
  public modulos: any = {};
  private urls$;
  private modulos$;

  constructor(public router: Router, public http: HttpClient) {}

  buscarUrls() {
    if (!this.urls$) {
      this.urls$ = this.buscarUrlsCached();
    }
    return this.urls$;
  }

  buscarUrlsCached() {
    return this.http
      .get<any>(environment.baseUrl + 'api-agendaEventos/servicos/corporativo')
      .pipe(
        shareReplay(1), // Cache
        tap(res => (this.urls = res))
      );
  }

  buscarModulos() {
    if (!this.modulos$) {
      this.modulos$ = this.buscarModulosCached();
    }
    return this.modulos$;
  }

  buscarModulosCached() {
    return this.http
      .get<any>(environment.baseUrl + 'api-agendaEventos/servicos/modulos')
      .pipe(
        map(modulos => this.reduceVetorParaObjeto(modulos)),
        shareReplay(1), // Cache
        tap(res => (this.modulos = res))
      );
  }

  private reduceVetorParaObjeto(modulos: any): any {
    return modulos.reduce(
      // tslint:disable-next-line:no-shadowed-variable
      (map, obj) => ((map[obj.nome] = obj.url), map),
      {}
    );
  }
}
