import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./usuario.model";

@Entity()
export class Transacao {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Usuario, transacoes_enviadas => Transacao)
    @JoinColumn({name: 'id_usuario_envio', referencedColumnName: 'id'})
    usuario_enviante: Usuario;

    @ManyToOne(type => Usuario, transacoes_recebidas => Transacao, {eager: true})
    @JoinColumn({name: 'id_usuario_recebedor', referencedColumnName: 'id'})
    usuario_recebedor: Usuario;

    @Column()
    valor: number;

    @CreateDateColumn({type: 'timestamp'})
    data_processamento: Date

    @Column()
    estornado: boolean;

}
