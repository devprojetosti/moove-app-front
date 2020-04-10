import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineAll, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { HttpCrudService } from './http-crud.service';
import { ServicosService } from '../service/core/servicos.service';
import { AuthService } from '../service/core/auth.service';

@Injectable()
export abstract class HttpRoutedService extends HttpCrudService {
  protected baseUrl;

  constructor(
    protected http: HttpClient,
    protected servicos: ServicosService,
    protected route: ActivatedRoute,
    protected auth: AuthService
  ) {
    super(http, servicos, auth);
  }

  getParams() {
    return from(this.route.pathFromRoot.concat(this.route)).pipe(
      map(route => route.params),
      combineAll(),
      map((params: any[]) =>
        params.reduce(
          // tslint:disable-next-line:no-shadowed-variable
          (map: Map<string, string>, obj) => {
            Object.keys(obj).forEach(key => {
              map.set(key, obj[key]);
            });
            return map;
          },
          new Map<string, string>()
        )
      )
    );
  }
}
