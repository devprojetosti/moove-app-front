import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
import { PageBase } from './page-base';
import { AlertaService } from '../service/core/alerta.service';

export class FormComponentBase extends PageBase {

  public form: FormGroup;
  public pt = {
    firstDayOfWeek: 0,
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado'
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ],
    today: 'Hoje',
    clear: 'Limpar'
  };

  public porcentagemFilter = /^\d+(?:\.\d{1,2})?$/;

  public static splitDateTime(date: Date): { date: Date, time: string } {
    const m = moment(date);
    const _time = m.format('HH:mm');
    const _date = m.hours(0).minutes(0).seconds(0).milliseconds(0).toDate();
    return { date: _date, time: _time };
  }

  public static joinDateHourMinute(date: String, time: string): Date {
    if (!isNullOrUndefined(date) && !isNullOrUndefined(time)) {
      const str = `${date} ${time}`;
      const m = moment(str, 'YYYY-MM-DD HH:mm', true);
      if (m.isValid()) {
        return m.toDate();
      } else {
        console.error(`Can not join date ${date} and time ${time}.`);
        return null;
      }
    } else if (!isNullOrUndefined(date)) {
      const m = moment(`${date}`, 'YYYY-MM-DD', true);
      if (m.isValid()) {
        return m.toDate();
      } else {
        console.error(`Can not convert date ${date} into moment.`);
        return null;
      }
    } else {
      return null;
    }
  }

  constructor(protected alertaService: AlertaService) {
    super(alertaService);
  }

  public getErrors(name: string, form?: FormGroup) {
    if (!form) {
      form = this.form;
    }
    const formControl = form.get(name);
    if (!formControl) {
      return null;
    }
    if (formControl.invalid && (formControl.dirty || formControl.touched)) {
      return formControl.errors.invalid
        ? formControl.errors.invalid
        : 'Campo obrigatório.';
    }
    return null;
  }

  protected alertErrors(formGroup: FormGroup) {
    const invalid: any = formGroup.getError('invalid');
    if (isNullOrUndefined(invalid)) {
      for (const controlName in formGroup.controls) {
        if (controlName && formGroup.controls[controlName] instanceof FormControl) {
          const control: FormControl = <FormControl>formGroup.controls[controlName];
          if (!control.valid) {
            if (isNullOrUndefined(control['message'])) {
              this.alertaService.showError(control.errors.invalid);
            } else {
              this.alertaService.showError(control['message']);
            }
          }
        }
      }
    } else {
      this.alertaService.showError(invalid);
    }
  }

  public splitDateTime(date: Date): { date: Date, time: string } {
    return FormComponentBase.splitDateTime(date);
  }

  public joinDateHourMinute(date: String, time: string): Date {
    return FormComponentBase.joinDateHourMinute(date, time);
  }
}
