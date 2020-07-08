import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../services/pedido.interface';
import { FormBase } from '@shared/form-base';
import { AlertaService } from '@service/core/alerta.service';
import { BasicValidators } from '@shared/basic-validators';
import { SelectItem } from 'primeng';
import * as moment from 'moment';
import { UsuarioService } from 'app/component/usuario/services/usuario.service';
import { ClienteService } from 'app/component/cliente/services/cliente.service';
import { param } from 'jquery';
import { AuthService } from '@service/core/auth.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  providers: [
    PedidoService,
    UsuarioService,
    ClienteService]
})
export class PedidoComponent extends FormBase implements OnInit {

  readonly = true;
  public id: any;
  tituloEdit: string = 'Cadastrar';
  visualizarEtapas = false;
  clientes: SelectItem[] = [];
  usuarios: SelectItem[] = [];
  visualizarEtapaExtra = false;

  constructor(
    protected formBuilder: FormBuilder,
    protected alertaService: AlertaService,
    private router: Router,
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    public authService: AuthService
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
    this.populateClientes();
    console.log(this.authService.currentUserValue)
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

  private populateClientes() {
    this.clienteService.search(0, 100, 'nome', 1, {}).subscribe(
      data => {
        console.log('data', data);
        const content = data;
        this.clientes = content.map(cliente => {
          return {label: cliente.nome, value: cliente};
        });
        console.log('content', content);
      }
    );
  }

  salvar() {
    this.clearErrors();
    this.validateForm();
    if (this.form.valid) {
      const pedido = this.form.getRawValue();
      console.log('pedido', pedido)
      this.pedidoService.save(pedido).subscribe(
        () => {
          this.router.navigate(['/pedidos']);
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
      pedido: [null, [BasicValidators.required, BasicValidators.maxLength(500)]],
      cor: [null],
      peso: [null],
      cliente: [null],
      usuario: [null],
      excluido: ['NAO', [BasicValidators.required]],
      dataAluminio: [null],
      dataComponentes: [null],
      dataMedicao: [null],
      dataVidro: [null],
      dataEntrega: [null],
      dataInstalacao: [null],
      etapa: [null]
    };
    this.form = this.formBuilder.group(group);
  }

  private patchFormGroup(pedido: Pedido) {
    const controls = this.form.controls;
    console.log('pedido', pedido);
    controls.id.setValue(pedido.id);
    controls.pedido.setValue(pedido.pedido);
    controls.cor.setValue(pedido.cor);
    controls.peso.setValue(pedido.peso);
    controls.cliente.setValue(pedido.cliente);
    controls.usuario.setValue(pedido.usuario);
    controls.excluido.setValue(pedido.excluido);
    if(pedido.dataAluminio){
      const date = moment(pedido.dataAluminio, 'YYYY/MM/DD');
      controls.dataAluminio.setValue(date.toDate());
    }
    if(pedido.dataInstalacao){
      const date = moment(pedido.dataInstalacao, 'YYYY/MM/DD');
      controls.dataInstalacao.setValue(date.toDate());
    }
    if(pedido.dataComponentes){
      const date = moment(pedido.dataComponentes, 'YYYY/MM/DD');
      controls.dataComponentes.setValue(date.toDate());
    }
    if(pedido.dataMedicao){
      const date = moment(pedido.dataMedicao, 'YYYY/MM/DD');
      controls.dataMedicao.setValue(date.toDate());
    }
    if(pedido.dataVidro){
      const date = moment(pedido.dataVidro, 'YYYY/MM/DD');
      controls.dataVidro.setValue(date.toDate());
    }
    if(pedido.dataEntrega){
      const date = moment(pedido.dataEntrega, 'YYYY/MM/DD');
      controls.dataEntrega.setValue(date.toDate());
    }
  }

  private edit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        console.log('params', params);
        if(params.get('etapas')) {
          console.log('teste');
          this.visualizarEtapas = true;
        }
        this.tituloEdit = 'Editar';
        this.pedidoService.findOne(this.id).subscribe(
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
