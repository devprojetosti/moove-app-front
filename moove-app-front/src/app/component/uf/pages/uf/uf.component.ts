import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UfService } from '../../services/uf.service';
import { Uf } from '../../services/uf.interface';
import { FormBase } from '@shared/form-base';
import { AlertaService } from '@service/core/alerta.service';
import { BasicValidators } from '@shared/basic-validators';

@Component({
  selector: 'app-uf',
  templateUrl: './uf.component.html',
  styleUrls: ['./uf.component.css'],
  providers: [UfService]
})
export class UfComponent extends FormBase implements OnInit {

  readonly = true;
  public id: any;
  tituloEdit: string = 'Cadastrar';

  constructor(
    protected formBuilder: FormBuilder,
    protected alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute,
    private ufService: UfService,
  ) {
    super(formBuilder, alertaService);
    this.route.data.subscribe(
      data => {
        if ('view' === data.action) {
          this.readonly = true;
        } else {
          this.readonly = false;
        }
      },
      err => {
        this.handleErrorAlert(err);
        this.handleValidationErrors(err);
      }
    );
  }

  ngOnInit() {
    this.setForm();
    this.edit();
  }

  salvar() {
    this.clearErrors();
    this.validateForm();
    if (this.form.valid) {
      const tema = this.form.getRawValue();
      this.ufService.save(tema).subscribe(
        () => {
          this.router.navigate(['/temas']);
          this.alertaService.showSuccess('Registro salvo com sucesso');
        },
        err => {
          this.handleErrorAlert(err);
          this.handleValidationErrors(err);
        }
      );
    }
  }

  private setForm() {
    const group = {
      id: [null],
      nome: [null, [BasicValidators.required, BasicValidators.maxLength(500)]],
      sigla: [null, [BasicValidators.required, BasicValidators.maxLength(2)]]
    };
    this.form = this.formBuilder.group(group);
  }

  private patchFormGroup(uf: Uf) {
    const controls = this.form.controls;
    controls.id.setValue(uf.id);
    controls.nome.setValue(uf.nome);
    controls.sigla.setValue(uf.sigla);
  }

  private edit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.tituloEdit = 'Editar';
        this.ufService.findOne(this.id).subscribe(
          res => {
            this.patchFormGroup(res);
          },
          err => {
          }
        );
      }
    });
  }

}
