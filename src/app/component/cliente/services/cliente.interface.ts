import { SimNao, Usuario } from "app/component/usuario/services/usuario.interface";

export interface Cliente {
    id: number;
    nome: string;
    endereco: string;
    telefone: number;
    cpf: string;
    cnpj:string;
    dataNascimento: Date;
    usuario: Usuario;
    excluido: SimNao;
}
