import { Component } from '@angular/core';
import { Usuario } from './component/usuario/services/usuario.interface';
import { Router } from '@angular/router';
import { AuthService } from '@service/core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: Usuario;
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      console.log('ab');
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
