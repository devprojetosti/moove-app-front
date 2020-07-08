import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Usuario } from '../usuario/services/usuario.interface';
import { AuthService } from '@service/core/auth.service';
import { UsuarioService } from '../usuario/services/usuario.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: Usuario;
    users = [];

    constructor(
        private authenticationService: AuthService,
        private usuarioService: UsuarioService
    ) {
        console.log('a');
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        console.log('ab');
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.usuarioService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.usuarioService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}