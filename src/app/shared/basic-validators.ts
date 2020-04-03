import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

export class BasicValidators {
  static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      if (control.value.length > max) {
        return {
          invalid: `O tamanho máximo deste campo deve ser ${max} caracteres.`
        };
      }
      return null;
    };
  }

  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      if (control.value.length < min) {
        return {
          invalid: `O tamanho mínimo deste campo deve ser ${min} caracteres.`
        };
      }
      return null;
    };
  }

  static minValue(min: number, message?: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (isNullOrUndefined(control.value) || (typeof control.value === 'string' && control.value.trim().length === 0)) {
        return null;
      }
      if (control.value < min) {
        if (isNullOrUndefined(message)) {
          return { invalid: `O valor mínimo deste campo deve ser ${min}.` };
        } else {
          return { invalid: message };
        }
      }
      return null;
    };
  }

  static maxValue(max: number, message?: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (isNullOrUndefined(control.value) || (typeof control.value === 'string' && control.value.trim().length === 0)) {
        return null;
      }
      if (control.value > max) {
        if (isNullOrUndefined(message)) {
          return { invalid: `O valor máximo deste campo deve ser ${max}.` };
        } else {
          return { invalid: message };
        }
      } else {
        return null;
      }
    };
  }


  static isHorarioValido(horario: string): boolean {
    const regex = '[012][0123456789]\\:[012345][0123456789]';
    if (isNullOrUndefined(horario) || !new RegExp(regex).test(horario)) {
      return false;
    } else {
      const horas = parseInt(horario.split(':')[0], 10);
      const minutos = parseInt(horario.split(':')[1], 10);
      if (horas < 24 && minutos < 60) {
        return true;
      } else {
        return false;
      }
    }
  }

  static horario(message?: string): ValidatorFn {
    const regex = '[012][0123456789]\\:[012345][0123456789]';
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (isNullOrUndefined(control.value) || !new RegExp(regex).test(control.value)) {
        return null;
      }
      const horas = parseInt(control.value.split(':')[0], 10);
      const minutos = parseInt(control.value.split(':')[1], 10);
      if (horas < 24 && minutos < 60) {
        return null;
      } else {
        if (isNullOrUndefined(message)) {
          return { invalid: `Horário inválido` };
        } else {
          return { invalid: message };
        }
      }
    };
  }

  static horarios(nomeFormControlInicio: string, nomeFormControlFim: string, message?: string): ValidatorFn {
    if (isNullOrUndefined(message)) {
      message = 'O horário inicial não pode ser posterior ao final.';
    }
    return (form: FormGroup): { [key: string]: any } | null => {
      const formControlInicio: FormControl = <FormControl>form.get(nomeFormControlInicio);
      const formControlFim: FormControl = <FormControl>form.get(nomeFormControlFim);
      if (formControlInicio.valid && formControlInicio.value
        && formControlFim.valid && formControlFim.value) {
        const inicio = formControlInicio.value.split(':');
        const fim = formControlFim.value.split(':');
        let lhs = parseInt(inicio[0], 10);
        let rhs = parseInt(fim[0], 10);
        if (lhs > rhs) {
          return { invalid: message };
        } else {
          lhs = parseInt(inicio[1], 10);
          rhs = parseInt(fim[1], 10);
          if (lhs > rhs) {
            return { invalid: message };
          } else {
            return null;
          }
        }
      } else {
        return null;
      }
    };
  }

  static digits(integer: number, fraction: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const valorMaximo = Math.pow(10, integer) - 0.01;
      if (control.value > valorMaximo) {
        return {
          invalid: `Valor maior do que ${valorMaximo
            .toString()
            .replace('.', ',')}.`
        };
      }
      const regexCasasFracionarias = `^\\d+(?:\\.\\d{1,${fraction}})?$`;
      const parteFracionariaIncorreta = !new RegExp(
        regexCasasFracionarias
      ).test(control.value);
      if (parteFracionariaIncorreta) {
        return {
          invalid: `Valor inválido. Ex: ${new Array(integer + 1).join(
            '#'
          )},${new Array(fraction + 1).join('#')}`
        };
      }
      return null;
    };
  }

  static email(control: FormControl): any {
    if (!control.value) {
      return { required: true };
    }
    // tslint:disable-next-line:max-line-length
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = regEx.test(control.value.trim());
    return valid ? null : { invalid: 'Email inválido' };
  }

  static emails(control: FormControl): any {
    if (!control.value) {
      return { required: true };
    }
    // tslint:disable-next-line:max-line-length
    const regEx = /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))[\s;]?)+$/;
    const valid = regEx.test(control.value.trim());
    return valid ? null : { invalid: 'Email inválido' };
  }

  static password(control: FormControl): any {
    if (!control.value) {
      return { invalid: 'Senha obrigatória' };
    }
    if (control.value.length === 0) {
      return { invalid: 'Senha obrigatória' };
    }
    if (control.value.length < 8) {
      return { invalid: 'A sua senha deve ter mais de 8 caracteres.' };
    }
    return null;
  }

  static passwordsShouldMatch(control: AbstractControl): any {
    const password = control.get('senhaNova').value;
    const passwordConfirm = control.get('confirmaSenha').value;
    if (password === '' || passwordConfirm === '') {
      return null;
    }
    if (password !== passwordConfirm) {
      return { passwordsShouldMatch: true };
    }
    return null;
  }

  static date(control: FormControl): any {
    const date = control.value;
    if (!date) {
      return null;
    }
    if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
      return { invalid: 'Data inválida' };
    }
    return null;
  }

  static datetime(control: FormControl): any {
    const date = control.value;
    if (!date) {
      return null;
    }
    if (!moment(date, 'DD/MM/YYYY HH:mm', true).isValid()) {
      return { invalid: 'Data inválida.' };
    }
    return null;
  }

  static obrigatorio(msg?: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      msg = msg ? msg : 'Campo obrigatório.';
      if (control.value == null) {
        return { invalid: msg };
      }
      if (control.value.length === 0) {
        return { invalid: msg };
      }
      return null;
    };
  }

  static required(control: AbstractControl): any {
    if (control.value == null) {
      return { invalid: 'Campo obrigatório.' };
    }
    if (control.value.length === 0) {
      return { invalid: 'Campo obrigatório.' };
    }
    return null;
  }

  static cpf(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    let sum = 0;
    let remainder: number;
    const cpf = control.value.replace(/[^0-9a-z]/gi, '');
    if (cpf === '00000000000') {
      return { invalid: 'CPF inválido' };
    }
    if (cpf.length < 11) {
      return { invalid: 'CPF inválido' };
    }

    for (let i = 1; i <= 9; i++) {
      // tslint:disable-next-line:radix
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== +cpf.substring(9, 10)) {
      return { invalidCPF: 'CPF inválido' };
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + +cpf.substring(i - 1, i) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== +cpf.substring(10, 11)) {
      return { invalid: 'CPF inválido' };
    }
    return null;
  }

  static cep(control: FormControl): any {
    if (!control.value) {
      return { required: true };
    }
    const cep = control.value.replace(/[^0-9]/gi, '');
    if (cep.length === 0) {
      return { required: true };
    }
    if (cep.length !== 8) {
      return { invalid: 'CEP inválido.' };
    }
    return null;
  }

  static numeric(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const isNum = /^[0-9.]+$/.test(control.value);
    if (!isNum) {
      return { invalid: 'Campo numérico.' };
    }
    return null;
  }

  static integer(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const isNum = /^[0-9]+$/.test(control.value);
    if (!isNum) {
      return { invalid: 'Campo inteiro.' };
    }
    return null;
  }

  static porcentagem(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    if (+control.value < 0) {
      return { invalid: 'Valor mínimo 0,00.' };
    }
    if (+control.value > 100) {
      return { invalid: 'Valor máximo 100,00.' };
    }
    const temNoMaxDuasCasasDecimais = /^\d+(?:\.\d{1,2})?$/.test(control.value);
    if (!temNoMaxDuasCasasDecimais) {
      return { invalid: 'Valor inválido. Ex: ###,##' };
    }
    return null;
  }

  static telefone(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const telefone = control.value.replace(/[^0-9]/gi, '');
    if (telefone.length !== 10) {
      return { invalid: 'Telefone Inválido' };
    }
    return null;
  }

  static celular(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const celular = control.value.replace(/[^0-9]/gi, '');
    if (celular.length !== 11 && celular.length !== 10) {
      return { invalid: 'Celular Inválido' };
    }
    return null;
  }

  static ano(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    let ano = control.value + '';
    ano = ano.replace(/[^0-9]/gi, '');
    if (ano.length !== 4) {
      return { invalid: 'Ano inválido' };
    }
    return null;
  }

  static atLeastOne = (validator: ValidatorFn) => (
    group: FormGroup
  ): ValidationErrors | null => {
    const hasAtLeastOne =
      group &&
      group.controls &&
      Object.keys(group.controls).some(k => !validator(group.controls[k]));

    return hasAtLeastOne
      ? null
      : {
        atLeastOne: true
      };
  }

  static dataInicioVigenciaDeveSerMenorDataFimVigencia(
    control: AbstractControl
  ): any {
    const dataInicioVigencia = control.get('dataInicioVigencia').value;
    const dataFimVigencia = control.get('dataFimVigencia').value;
    if (
      moment(dataInicioVigencia, 'DD/MM/YYYY').isAfter(
        moment(dataFimVigencia, 'DD/MM/YYYY')
      )
    ) {
      return {
        dataInvalida:
          'A data de início da vigência deve ser menor do que a data de fim da vigência.'
      };
    }
    return null;
  }

  static dataInicioDeveSerMenorDataFim(
    dataInicioControl: string,
    dataFimControl: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dataInicio = control.get(dataInicioControl).value;
      const dataFim = control.get(dataFimControl).value;
      if (
        moment(dataInicio, 'DD/MM/YYYY').isAfter(moment(dataFim, 'DD/MM/YYYY'))
      ) {
        return {
          dataInvalida: 'A data de início deve ser menor do que a data de fim.'
        };
      }
      return null;
    };
  }

  static dataHoraInicioDeveSerMenorDataHoraFim(
    dataInicioControl: string,
    dataFimControl: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dataInicio = control.get(dataInicioControl).value;
      const dataFim = control.get(dataFimControl).value;
      const momentInicio = moment(dataInicio, 'DD/MM/YYYY kk:mm');
      const momentFim = moment(dataFim, 'DD/MM/YYYY kk:mm');
      if (momentInicio.isAfter(momentFim)) {
        return {
          dataInvalida: 'A data de início deve ser menor do que a data de fim.'
        };
      }
      return null;
    };
  }

  static requiredIfTrue(
    requiredControlName: string,
    trueControlName: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const trueControl = control.get(trueControlName).value;
      if (!isNullOrUndefined(trueControl) && trueControl) {
        return BasicValidators.required(control.get(requiredControlName));
      } else {
        return null;
      }
    };
  }

  static requiredIfFalse(
    requiredControlName: string,
    trueControlName: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const trueControl = control.get(trueControlName).value;
      if (!isNullOrUndefined(trueControl) && !trueControl) {
        return BasicValidators.required(control.get(requiredControlName));
      } else {
        return null;
      }
    };
  }


}

export interface Message {
  field?: string;
  severity?: string;
  summary?: string;
  detail?: string;
}

export interface ValidationResults {
  valid?: boolean;
  messages?: Message[];
}
