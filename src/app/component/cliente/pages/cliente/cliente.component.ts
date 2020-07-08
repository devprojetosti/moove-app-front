import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertaService } from '@service/core/alerta.service';
import { BasicValidators } from '@shared/basic-validators';
import { FormBase } from '@shared/form-base';
import { SelectItem } from 'primeng';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../services/cliente.interface';
import * as moment from 'moment';
import { UsuarioService } from 'app/component/usuario/services/usuario.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  providers: [ClienteService, UsuarioService]
})
export class ClienteComponent extends FormBase implements OnInit {

  readonly = true;
  public id: any;
  tituloEdit: string = 'Cadastrar';
  clientes: SelectItem[] = [];
  usuarios: SelectItem[] = [];
  consultores: SelectItem[] = [];

  constructor(
    protected formBuilder: FormBuilder,
    protected alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService
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
    this.populateUsuarios();
  }

  private populateUsuarios() {
    console.log('data');
    this.usuarioService.findAllConsultores().subscribe(
      data => {
        console.log('data', data);
        const content = data;
        this.usuarios = content.map(usuario => {
          return {label: usuario.nome, value: usuario};
        });
        console.log('content', content);
      }
    );
  }

  salvar() {
    this.clearErrors();
    this.validateForm();
    if (this.form.valid) {
      const cliente = this.form.getRawValue();
      this.clienteService.save(cliente).subscribe(
        () => {
          this.router.navigate(['/clientes']);
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
      cpf: [null, [BasicValidators.maxLength(11)]],
      cnpj: [null, [ BasicValidators.maxLength(14)]],
      dataNascimento: [null, [BasicValidators.required, BasicValidators.maxLength(500)]],
      usuario: [null, [BasicValidators.required]],
      excluido: ['NAO', [BasicValidators.required]]
    };
    this.form = this.formBuilder.group(group);
  }

  private patchFormGroup(cliente: Cliente) {
    const controls = this.form.controls;
    console.log('cliente', cliente);
    controls.id.setValue(cliente.id);
    controls.nome.setValue(cliente.nome);
    controls.endereco.setValue(cliente.endereco);
    controls.telefone.setValue(cliente.telefone);
    controls.cpf.setValue(cliente.cpf);
    controls.cnpj.setValue(cliente.cnpj);
    controls.usuario.setValue(cliente.usuario);
    if(cliente.dataNascimento){
      const date = moment(cliente.dataNascimento, 'YYYY/MM/DD');
      controls.dataNascimento.setValue(date.toDate());
    }
    controls.excluido.setValue(cliente.excluido);
  }

  private edit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.tituloEdit = 'Editar';
        this.clienteService.findOne(this.id).subscribe(
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
