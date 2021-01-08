import { Controller, Get, Post, Body, ValidationPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { TransacaoRepository } from 'src/repository/transacao.repository';
import { TransacaoCadastroResponse, TransacaoEstornoResponse } from 'src/api-doc/transacao.response';
import { TransacaoCadastroDto, TransacaoEstornoDto, TransacaoBuscaDto } from 'src/dto/transacao.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('transacoes')
export class TransacaoController {
    constructor(
        @InjectRepository(TransacaoRepository)
        private transacaoRepo: TransacaoRepository
    ) { }

    @ApiCreatedResponse({ type: TransacaoCadastroResponse })
    @Post("cadastro")
    async cadastro(@Body(new ValidationPipe({ errorHttpStatusCode: 422 })) body: TransacaoCadastroDto): Promise<any> {
        return this.transacaoRepo.cadastrar(body);
    }

    @ApiCreatedResponse({ type: TransacaoEstornoResponse })
    @Post("estorno")
    async estorno(@Body(new ValidationPipe({ errorHttpStatusCode: 422 })) body: TransacaoEstornoDto): Promise<any> {
        body.estornado = false
        return this.transacaoRepo.estornar(body);
    }

    @ApiCreatedResponse({ type: TransacaoCadastroResponse })
    @Post("busca")
    async busca(@Body(new ValidationPipe({ errorHttpStatusCode: 422 })) body: TransacaoBuscaDto): Promise<any> {
        return this.transacaoRepo.busca(body);
    }

    @Get() // Debug
    async lista(@Body(new ValidationPipe({ errorHttpStatusCode: 422 })) body: any): Promise<any> {
        return this.transacaoRepo.find();
    }
}
