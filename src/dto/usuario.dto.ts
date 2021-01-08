import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UsuarioDto {

    @ApiProperty({type: String, description: 'Nome completo do usuário'})
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({type: String, description: 'CPF do usuário'})
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @ApiProperty({type: Number, description: 'Saldo inicial do usuário'})
    @IsNumber()
    saldo: number;
}

export class UsuarioLoginDto {

    @ApiProperty({type: Number, description: 'Id do usuário'})
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty({type: String, description: 'CPF do usuário'})
    @IsString()
    @IsNotEmpty()
    cpf: string;
}

export class UsuarioSaldoDto {

    @ApiProperty({type: String, description: 'Token do usuário'})
    @IsString()
    @IsNotEmpty()
    token: string;
}