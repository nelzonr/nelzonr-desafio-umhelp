import { Injectable, BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository, getCustomRepository, Between } from "typeorm";
import { Transacao } from "../models/transacao.model";
import { Usuario } from "../models/usuario.model";
import { UsuarioRepository } from 'src/repository/usuario.repository';

@Injectable()
@EntityRepository(Transacao)
export class TransacaoRepository extends Repository<Transacao> {

    private usuarioRepo = getCustomRepository(UsuarioRepository);

    async cadastrar(body: any) {
        const usuario_enviante:Usuario = await this.usuarioRepo.findOne({where: {token: body.token}});
        if (!usuario_enviante) {
          throw new BadRequestException('Usuário inexistente');
        }
        if (usuario_enviante.saldo < body.valor) {
          throw new BadRequestException('Saldo insuficiente');
        }
        if (usuario_enviante.id == body.id_usuario_recebedor) {
          throw new BadRequestException('Usuário recebedor não pode ser o mesmo que o enviante');
        }
        const usuario_recebedor:Usuario = await this.usuarioRepo.findOne(body.id_usuario_recebedor);
        if (!usuario_recebedor) {
          throw new BadRequestException('Usuário recebedor inexistente');
        }
  
        const valor:number = +body.valor;
        usuario_enviante.saldo = +usuario_enviante.saldo - valor;
        usuario_recebedor.saldo = +usuario_recebedor.saldo + valor;
        this.usuarioRepo.save(usuario_enviante);
        this.usuarioRepo.save(usuario_recebedor);
  
        const transacao:Transacao = new Transacao();
        transacao.usuario_enviante = usuario_enviante;
        transacao.usuario_recebedor = usuario_recebedor;
        transacao.valor = body.valor;
        transacao.estornado = body.estornado;
  
        const responseTransacao:any = await this.save(transacao);
        responseTransacao.usuario_recebedor = usuario_recebedor.id;
        return responseTransacao;
    }

    async estornar(body: any) {
        const usuario:Usuario = await this.usuarioRepo.findOne({
            relations: ["transacoes_enviadas", "transacoes_recebidas"],
            where: {token: body.token}
        });
        if (!usuario) {
          throw new BadRequestException('Usuário inexistente');
        }

        const transacao:Transacao = usuario.transacoes_enviadas.find(transacao => transacao.id == body.id_transacao);
        if(!transacao) {
            throw new BadRequestException('Transação inexistente');
        }
        if(transacao.estornado) {
            throw new BadRequestException('Transação já estornada');
        }
        if(transacao.valor > transacao.usuario_recebedor.saldo) {
            throw new BadRequestException('Não é possível realizar este estorno');
        }
       
        await this.cadastrar({
            token: transacao.usuario_recebedor.token,
            id_usuario_recebedor: usuario.id,
            valor: transacao.valor,
            estornado: true
        });

        transacao.estornado = true;
        const resultadoEstorno:any = await this.update({id: transacao.id}, transacao);
        return {estornado: resultadoEstorno.affected}
    }

    async busca(body: any) {
        const data_inicio:Date = new Date(body.data_inicio + 'T00:00:00Z');
        const data_fim:Date = new Date(body.data_fim + 'T23:59:59Z');
        const transacoes: Transacao[] = await this.find({ 
            where: { data_processamento: Between(data_inicio, data_fim) }
        });

        return transacoes;
    }

    private erro(mensagem: any) {
        throw new BadRequestException(mensagem);
    }

}
