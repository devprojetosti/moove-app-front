import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicosService } from '@service/core/servicos.service';
import { map, shareReplay } from 'rxjs/operators';
import { HttpCachedService } from '@shared/http-cached.service';
import { AdminModule } from '@admin/admin.module';
import { AuthService } from '@service/core/auth.service';

@Injectable({
  providedIn: AdminModule
})
export class EntidadeService extends HttpCachedService {
  private entidadeComDepartamento$;

  constructor(public http: HttpClient, public servicos: ServicosService, protected auth: AuthService) {
    super(http, servicos, auth);
    this.baseUrl = this.servicos.urls.urlEntidadesSistema;
  }

  listarComDepartamentosTree() {
    return this.listarComDepartamentos().pipe(map(entidades => this.createTree(entidades)));
  }

  listarComDepartamentos() {
    if (!this.entidadeComDepartamento$) {
      this.entidadeComDepartamento$ = this.listarComdepartamentoCached();
    }
    return this.entidadeComDepartamento$;
  }

  private createTree(entidades: any) {
    return entidades.map(entidade => {
      return {
        label: entidade.nome,
        data: entidade,
        children: entidade.departamentos.map(departamento => {
          return {
            label: departamento.nome,
            data: departamento
          };
        })
      };
    });
  }

  private listarComdepartamentoCached() {
    const url = this.servicos.modulos.administracao + '/api/entidades/';
    return this.http.get<any[]>(url).pipe(
      shareReplay(1) // Cache
    );
  }
}
