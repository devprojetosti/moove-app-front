import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { combineLatest } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ServicosService } from './servicos.service';

@Injectable({
  providedIn: 'root'
})
export class ServicosGuard implements CanActivate {
  constructor(private servicos: ServicosService, private router: Router, private auth: AuthService) {}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.servicos
        .buscarUrls()
        .pipe(combineLatest(this.servicos.buscarModulos()))
        .subscribe(
          ([urls, modulos]) => {
            // console.log(urls);
            // console.log(modulos);
            resolve(true);
          },
          err => {
            this.auth.logout();
            resolve(false);
          }
        );
    });
  }
}
