import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertaService } from '@service/core/alerta.service';
import { BasicValidators } from '@shared/basic-validators';
import { FormBase } from '@shared/form-base';
import { SelectItem } from 'primeng';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../services/usuario.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  providers: [UsuarioService]
})
export class UsuarioComponent extends FormBase implements OnInit {

  readonly = true;
  editar: any = false;
  public id: any;
  tituloEdit: string = 'Cadastrar';
  funcoes: SelectItem[] = [
    {label: 'Consultor', value: 'CONSULTOR'},
    {label: 'Diretor de Produção', value: 'DIRETOR_PRODUCAO'},
    {label: 'Diretor Comercial', value: 'DIRETOR_COMERCIAL'},
    {label: 'Administrador', value: 'ADMINISTRADOR'},
  ];
  consultores: SelectItem[] = [];

  constructor(
    protected formBuilder: FormBuilder,
    protected alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
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
      const usuario = this.form.getRawValue();
      console.log('usuario', usuario)
      this.usuarioService.save(usuario).subscribe(
        () => {
          this.router.navigate(['/usuarios']);
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
      endereco: [null, [BasicValidators.required, BasicValidators.maxLength(500)]],
      telefone: [null, [BasicValidators.required, BasicValidators.maxLength(12)]],
      cpf: [null, [BasicValidators.required, BasicValidators.maxLength(11)]],
      login: [null, [BasicValidators.required, BasicValidators.maxLength(500)]],
      senha: [null, [BasicValidators.required, BasicValidators.maxLength(500)]],
      cargo: [null],
      excluido: ['NAO', [BasicValidators.required]]
    };
    this.form = this.formBuilder.group(group);
  }

  private patchFormGroup(usuario: Usuario) {
    const controls = this.form.controls;
    console.log('usuario', usuario);
    controls.id.setValue(usuario.id);
    controls.nome.setValue(usuario.nome);
    controls.endereco.setValue(usuario.endereco);
    controls.telefone.setValue(usuario.telefone);
    controls.cpf.setValue(usuario.cpf);
    controls.login.setValue(usuario.login);
    controls.senha.setValue(usuario.senha);
    controls.cargo.setValue(usuario.cargo);
    controls.excluido.setValue(usuario.excluido);
  }

  private edit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.tituloEdit = 'Editar';
        this.editar = true;
        this.usuarioService.findOne(this.id).subscribe(
          res => {
            console.log('res', res)
            this.patchFormGroup(res);
          },
          err => {
          }
        );
      }
    });
  }

}
