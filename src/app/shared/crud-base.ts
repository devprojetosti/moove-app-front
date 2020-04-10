import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, Optional } from '@angular/core';
import { from } from 'rxjs';
import { map, combineAll } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { FormBase } from './form-base';
import { AlertaService } from '../service/core/alerta.service';
import { HttpCrudService } from './http-crud.service';
import { Genero } from './enum/genero.enum';

export abstract class CrudBase extends FormBase implements OnInit {
  codigo: number;
  breadcrumb: MenuItem[] = [];
  item;

  constructor(
    protected formBuilder: FormBuilder,
    protected alertaService: AlertaService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected service: HttpCrudService,
    public nome: string,
    @Optional() private genero: string = Genero.masculino
  ) {
    super(formBuilder, alertaService);
  }

  ngOnInit() {
    this.setForm();
    this.getCodigo();
  }

  protected getCodigo() {
    this.getParams().subscribe((params: ParamMap) => {
      const codigo = params.get('codigo');
      this.codigo = +codigo;
      this.buscar();
      this.setBreadcrumb();
    });
  }

  protected buscar() {
    if (this.codigo) {
      this.service.buscar(this.codigo).subscribe(
        res => {
          this.item = res;
          this.form.patchValue(this.item);
        },
        err => {
          this.handleErrorAlert(err);
        }
      );
    }
  }

  salvar() {
    this.clearErrors();
    this.validateForm();
    if (this.form.valid) {
      const item = this.form.value;
      if (this.codigo) {
        this.atualizar(item);
      } else {
        this.criar(item);
      }
    }
  }

  protected criar(item: any) {
    this.service.criar(item).subscribe(
      res => {
        this.alertaService.showSuccess(
          `${this.nome} Criad${
            this.genero === Genero.masculino ? 'o' : 'a'
          } com Sucesso.`
        );
        this.navegarAoCriar();
      },
      err => {
        this.handleErrorAlert(err);
        this.handleValidationErrors(err);
      }
    );
  }

  protected navegarAoCriar() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }

  protected atualizar(item: any) {
    this.service.atualizar(this.codigo, item).subscribe(
      res => {
        this.alertaService.showSuccess(
          `${this.nome} Atualizad${
            this.genero === Genero.masculino ? 'o' : 'a'
          } com Sucesso.`
        );
        this.navegarAoAtualizar();
      },
      err => {
        this.handleErrorAlert(err);
        this.handleValidationErrors(err);
      }
    );
  }

  protected navegarAoAtualizar() {
    this.router.navigate(['../../'], {
      relativeTo: this.route
    });
  }

  protected setForm() {}

  protected setBreadcrumb() {}

  protected getParams() {
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
