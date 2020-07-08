import { Usuario, SimNao } from "app/component/usuario/services/usuario.interface";

export interface Pedido {
    id: number;
    cor: string;
    peso: number;
    pedido: string;
    cliente: string;
    usuario: Usuario;
    excluido: SimNao;
    dataAluminio: Date;
    dataComponentes: Date;
    dataMedicao: Date;
    dataVidro: Date;
    dataEntrega: Date;
    dataInstalacao: Date;
    etapa?: EtapaPedido;
}

export interface EtapaPedido {
    id?: number;
    etapa?: Etapa;
    pedido?: Pedido;
    concluido?: SimNao;
    dataConclusao?: Date;
    ativo?: SimNao;
    descricao?: string;
}

export interface Etapa {
    value: any;
    id: string,
    descricao: string
}

export const ETAPA_PEDIDO = {
    COMPRA_ALUMINIIO: {id: 'A', nome: 'Compra de Alumínio'},
    COMPRA_VIDRO: {id: 'V', nome: 'Compra do Alumínio'},
    MEDICAO_OBRA: {id: 'M', nome: 'Medição da Obra'},
    ENTREGA: {id: 'E', nome: 'Entrega'},
    COMPRA_COMPONENTES: {id: 'C', nome: 'Compra de Componentes'},
    INSTALACAO: {id: 'I', nome: 'Instalação'},
}