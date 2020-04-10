export class SimNaoConverter implements Converter {
    convert(obj: any): string {
        if (obj === true) {
            return 'Sim';
        } else if (obj === false) {
            return 'Não';
        } else {
            return '';
        }
    }

}
