import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DiaSemana } from './dia-semana.interface';
import { environment } from 'src/environments/environment';
import { ServicosService } from 'src/app/service/core/servicos.service';
import { AuthService } from 'src/app/service/core/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DiaSemanaService {

    private baseUrl = `${environment.baseUrl}api-agendaEventos/administracao/dias-semana`;

    constructor(
        public http: HttpClient,
        public servicos: ServicosService,
        protected auth: AuthService) {
    }

    public search(first: any, rows: any, sortField: string, sortOrder: any, filtro?: any): Observable<DiaSemana[]> {
        const params = { first: first, rows: rows, sortField: sortField, sortOrder: sortOrder };
        if (filtro) {
            for (const e in filtro) {
                if (e) {
                    params[e] = filtro[e];
                }
            }
        }
        return this.http.get<any[]>(this.baseUrl, { 'params': params }).pipe(
            shareReplay(1), // Cache
            catchError(err => this.handleError(err, () => this.search(first, rows, sortField, sortOrder, filtro)))
        );
    }

    protected handleError(error: any, callback: () => Observable<any>) {
        if (error.status === 401) { // Token expired
            return this.auth.refreshToken().pipe(
                switchMap(() => {
                    return callback();
                }),
                catchError(() => {
                    return Observable.throw(error);
                })
            );
        } else {
            return Observable.throw(error);
        }
    }
}
