import { ApiProperty } from "@nestjs/swagger";

export class UsuarioResponse {
    @ApiProperty({type: Number, description: 'Id do usuário'})
    id: number;

    @ApiProperty({type: String, description: 'Nome do usuário'})
    nome: string;

    @ApiProperty({type: String, description: 'CPF do usuário'})
    cpf: string;

    @ApiProperty({type: Number, description: 'Saldo do usuário'})
    saldo: number;

    @ApiProperty({type: String, description: 'Token do usuário'})
    token: string;

    @ApiProperty({type: Date, description: 'Data de criação do usuário'})
    data_criacao:Date
}

export class UsuarioLoginResponse {
    @ApiProperty({type: String, description: 'Token do usuário'})
    token: string;
}

export class UsuarioSaldoResponse {
    @ApiProperty({type: Number, description: 'Saldo do usuário'})
    saldo: number;
}