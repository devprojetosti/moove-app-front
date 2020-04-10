import { isArray, isNullOrUndefined, isNumber } from 'util';
import * as moment from 'moment';
import { AlertaService } from '../service/core/alerta.service';

export class PageBase {
  public isNumber = isNumber;
  error: any[] = [];
  breadcrumb = [];

  constructor(protected alertaService: AlertaService) { }

  handleErrorAlert(err: any) {
    console.log(err);
    if (err.error && err.error.detalhe) {
      this.alertaService.showError(err.error.detalhe);
    } else {
      this.alertaService.showError('Serviço indisponível.');
    }
  }

  handleError(err: any) {
    console.log(err);
    if (err.error && err.error.detalhe) {
      this.error = [
        {
          severity: 'error',
          summary: err.error.detalhe
        }
      ];
    } else {
      this.error = [
        {
          severity: 'error',
          summary: 'Serviço indisponível.'
        }
      ];
    }
  }

  nested(obj: any, names: any, converter?: Converter): any {
    if (obj && names) {
      if (typeof names === 'string') {
        const idx = names.indexOf('.');
        if (idx === -1) {
          if (converter) {
            return converter.convert(obj[names]);
          } else {
            return obj[names];
          }
        } else {
          const prop = names.substring(0, idx);
          const propValue = obj[prop];
          const nestedProperty = names.substring(idx + 1);
          if (isArray(propValue)) {
            let value = '';
            for (let i = 0; i < propValue.length; i++) {
              value += this.nested(propValue[i], nestedProperty, converter);
              if (i < propValue.length - 1) {
                value += ', ';
              }
            }
            return value;
          } else {
            return this.nested(propValue, nestedProperty, converter);
          }
        }
      } else if (typeof names === 'object' && !isNullOrUndefined(converter)) {
        const converterParam = {};
        for (const prop in names) {
          if (!isNullOrUndefined(prop)) {
            converterParam[prop] = obj[names[prop]];
          }
        }
        return converter.convert(converterParam);
      }
    } else {
      return null;
    }
  }

  public prepareFilter(filter: any): void {
    if (!isNullOrUndefined(filter)) {
      for (const e in filter) {
        if (!isNullOrUndefined(e)) {
          const value = filter[e];
          // Tratando datas do filtro
          if (!isNullOrUndefined(value) && moment.isDate(value)) {
            const m = moment(value);
            filter[e] = m.format('YYYY-MM-DD');
          }
        }
      }
    }
  }

  public dateMoment(dateTime: string): moment.Moment {
    return moment(dateTime.substring(0, 10), 'YYYY-MM-DD');
  }

  public today(): moment.Moment {
    let today = moment();
    today = today.hour(0);
    today = today.minute(0);
    today = today.second(0);
    today = today.millisecond(0);
    return today;
  }
}
