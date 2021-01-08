import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsNotEmpty, IsDecimal } from 'class-validator';

export class TransacaoCadastroDto {

    @ApiProperty({type: String, description: 'Token do usuário'})
    @IsString()
    @IsNotEmpty()
    token: string;

    @ApiProperty({type: Number, description: 'Id do usuário recebedor'})
    @IsNumber()
    id_usuario_recebedor: number;

    @ApiProperty({type: Number, description: 'Valor da transação'})
    @IsNumber()
    valor: number;

}

export class TransacaoEstornoDto {

    @ApiProperty({type: String, description: 'Token do usuário'})
    @IsString()
    @IsNotEmpty()
    token: string;

    @ApiProperty({type: Number, description: 'Id do usuário recebedor'})
    @IsNumber()
    id_transacao: number;

    estornado: boolean

}

export class TransacaoBuscaDto {

    @ApiProperty({type: String, description: 'Data Início (YYYY-MM-DD)'})
    @IsString()
    @IsNotEmpty()
    data_inicio: string;

    @ApiProperty({type: String, description: 'Data Fim (YYYY-MM-DD)'})
    @IsString()
    @IsNotEmpty()
    data_fim: string;

}