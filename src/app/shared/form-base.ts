import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { FormComponentBase } from './form-component-base';
import { ErrorComponent } from './error/error.component';
import { AlertaService } from '../service/core/alerta.service';
import { BasicValidators } from './basic-validators';

export class FormBase extends FormComponentBase implements AfterViewInit {
  @ViewChildren(ErrorComponent) errors: QueryList<ErrorComponent>;

  public validationErrors = [];
  public meses = [
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 },
    { label: 'Dezembro', value: 12 }
  ];
  constructor(
    protected formBuilder: FormBuilder,
    protected alertaService: AlertaService
  ) {
    super(alertaService);
  }

  ngAfterViewInit() {
    if (this.errors) {
      this.errors.forEach(error => (error.form = this.form));
    }
  }

  protected validateForm() {
    this.validateAllFormFields(this.form);
  }

  protected validateFormArray(formArray: FormArray) {
    formArray.controls.forEach((formGroup: FormGroup) =>
      this.validateAllFormFields(formGroup)
    );
  }

  protected validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  setCampoObrigatorio(controlName: string, mensagem?: string) {
    const control = this.form.get(controlName);
    control.setValidators([BasicValidators.obrigatorio(mensagem)]);
    control.updateValueAndValidity();
  }

  setCampoNaoObrigatorio(controlName: string) {
    const control = this.form.get(controlName);
    control.clearValidators();
    control.updateValueAndValidity();
  }

  desabilitarCampo(controlName: string, value?: any) {
    const control = this.form.get(controlName);
    control.disable();
  }

  habilitarCampo(controlName: string, value?: any) {
    const control = this.form.get(controlName);
    if (control.disabled) {
      control.enable();
    }
  }

  handleValidationErrors(error: any) {
    if (error.error && error.error.erros) {
      const erros = error.error.erros;
      this.createErrors(erros);
    }
  }

  private createErrors(erros: any[]) {
    this.validationErrors = erros.map((err: any) => {
      return {
        severity: 'error',
        summary: err.mensagem
      };
    });
  }

  clearErrors() {
    this.validationErrors = [];
    this.error = [];
  }
}
