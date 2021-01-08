import { ApiProperty } from "@nestjs/swagger";
import { Usuario } from "src/models/usuario.model";

export class TransacaoCadastroResponse {
    @ApiProperty({ type: Number, description: 'Id da transação' })
    id: number;

    @ApiProperty({type: Usuario, description: 'Usuário enviante'})
    usuario_enviante: Usuario;

    @ApiProperty({type: Number, description: 'Id do usuário recebedor'})
    usuario_recebedor: number;

    @ApiProperty({type: Number, description: 'Valor enviado'})
    valor: number;

    @ApiProperty({type: Date, description: 'Data da transação'})
    data_processamento: Date
}

export class TransacaoEstornoResponse {
    @ApiProperty({type: Number, description: 'Status do estorno'})
    estorno: number;
}