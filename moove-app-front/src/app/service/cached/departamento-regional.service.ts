import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicosService } from '@service/core/servicos.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminModule } from '@admin/admin.module';

@Injectable({
  providedIn: AdminModule
})
export class DepartamentoRegionalService {
  private departamentosReginaisMap$ = new Map<number, Observable<any>>();

  constructor(public http: HttpClient, public servicos: ServicosService) {}

  listarDropdown(codigoEntidade: number) {
    return this.listar(codigoEntidade).pipe(
      map(departamentosReginais => this.createDropdown(departamentosReginais))
    );
  }

  listar(codigoEntidade: number) {
    if (this.departamentosReginaisMap$.has(codigoEntidade)) {
      return this.departamentosReginaisMap$.get(codigoEntidade);
    }
    const departamentosReginais$ = this.listarCached(codigoEntidade);
    this.departamentosReginaisMap$.set(codigoEntidade, departamentosReginais$);
    return departamentosReginais$;
  }

  private createDropdown(departamentosReginais: any) {
    return departamentosReginais.map(departamentoReginal => {
      return {
        label: departamentoReginal.nome,
        value: departamentoReginal
      };
    });
  }

  private listarCached(codigoEntidade: number) {
    const url = this.servicos.urls.urlDepartamentosSistema.replace(
      '{codigoEntidade}',
      codigoEntidade
    );
    return this.http.get<any[]>(url).pipe(
      shareReplay(1) // Cache
    );
  }
}
