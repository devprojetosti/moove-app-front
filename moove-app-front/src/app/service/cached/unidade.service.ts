import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicosService } from '@service/core/servicos.service';
import { HttpService } from '@shared/http.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminModule } from '@admin/admin.module';

@Injectable({
  providedIn: AdminModule
})
export class UnidadeService {
  private unidadesMap$ = new Map<number, Observable<any>>();

  constructor(public http: HttpClient, public servicos: ServicosService) {}

  listar(codigoEntidade: number, codigoDepartamento: number) {
    if (this.unidadesMap$.has(codigoDepartamento)) {
      return this.unidadesMap$.get(codigoDepartamento);
    }
    const unidades$ = this.listCached(codigoEntidade, codigoDepartamento);
    this.unidadesMap$.set(codigoDepartamento, unidades$);
    return unidades$;
  }

  listarDropdown(codigoEntidade: number, codigoDepartamento: number) {
    return this.listar(codigoEntidade, codigoDepartamento).pipe(
      map(unidades => this.createDropdown(unidades))
    );
  }

  private createDropdown(unidades: any) {
    return unidades.map(departamentoReginal => {
      return {
        label: departamentoReginal.nome,
        value: departamentoReginal
      };
    });
  }

  private listCached(codigoEntidade: number, codigoDepartamento: number) {
    const url = this.servicos.urls.urlUnidadesSistema
      .replace('{codigoEntidade}', codigoEntidade)
      .replace('{codigoDepartamento}', codigoDepartamento);
    return this.http.get<any[]>(url).pipe(
      shareReplay(1) // Cache
    );
  }
}
