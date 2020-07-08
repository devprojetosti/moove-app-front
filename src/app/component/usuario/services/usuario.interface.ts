export interface Usuario {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
    cpf: string;
    login: string;
    senha: string;
    cargo: Cargo;
    excluido: SimNao;

}
export interface Cargo {
    value: any;
    id: string,
    descricao: string
}

export interface SimNao {
    value: any;
    id: string,
    descricao: string
}

export const CARGO = {
    ADMINISTRADOR: { id:'A', nome: 'Administrador' },
    CONSULTOR: { id:'C', nome: 'Consultor' },
    DIRETOR_PRODUCAO: { id:'P', nome: 'Diretor de Produção' },
    DIRETOR_COMERCIAL: { id:'O', nome: 'Diretor Comercial' }
};

export const SIMNAO = {
    SIM: { id:'S', nome: 'Sim' },
    NAO: { id:'N', nome: 'Não' }
};

