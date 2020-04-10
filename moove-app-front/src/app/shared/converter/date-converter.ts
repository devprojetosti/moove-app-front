import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

export class DateConverter implements Converter {

    convert(obj: any): string {
        if (obj) {
            const m = moment(obj);
            return m.format('DD/MM/YYYY');
        } else {
            return '';
        }
    }
}

export class DateTimeConverter implements Converter {
    convert(obj: { date: any, time: string, mes: number, ano: number, configuracaoData: { value: string, descricao: string } }): string {
        if (!isNullOrUndefined(obj.configuracaoData) && obj.configuracaoData.value === 'MES_ANO') {
            return `${obj.mes < 9 ? '0' : ''}${obj.mes + 1}/${obj.ano}`;
        } else if (!isNullOrUndefined(obj.configuracaoData) && obj.configuracaoData.value === 'DATA') {
            if (!isNullOrUndefined(obj) && !isNullOrUndefined(obj.date)) {
                const m = moment(obj.date);
                return `${m.format('DD/MM/YYYY')}`;
            } else {
                return '';
            }
        } else {
            if (!isNullOrUndefined(obj) && !isNullOrUndefined(obj.date) && !isNullOrUndefined(obj.time)) {
                const m = moment(obj.date);
                return `${m.format('DD/MM/YYYY')} ${obj.time}`;
            } else {
                return '';
            }
        }
    }
}
