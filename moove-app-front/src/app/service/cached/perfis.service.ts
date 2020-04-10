import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicosService } from '@service/core/servicos.service';
import { HttpCachedService } from '@shared/http-cached.service';
import { AdminModule } from '@admin/admin.module';
import { AuthService } from '@service/core/auth.service';

@Injectable({
  providedIn: AdminModule
})
export class PerfisService extends HttpCachedService {

  constructor(public http: HttpClient, public servicos: ServicosService, protected auth: AuthService) {
    super(http, servicos, auth);
    this.baseUrl = this.servicos.urls.urlPerfisSistema;
  }
}
