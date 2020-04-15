import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Observable<boolean>(
      observer => {
        if (this.auth.usuario && this.auth.menus) {
          if (this.auth.colaborador) {
            observer.next(true);
          } else {
            this.auth.configurarColaborador().subscribe(() => { observer.next(true); });
          }
        } else {
          this.auth.logout();
          return observer.next(false);;
        }
      }
    );
    
  }
}
