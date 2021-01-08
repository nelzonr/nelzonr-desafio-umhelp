import { Entity, Unique, PrimaryGeneratedColumn, Column, JoinColumn,Index, CreateDateColumn, OneToMany } from "typeorm";
import { Exclude } from 'class-transformer';
import { Transacao } from './transacao.model'

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Index({ unique: true })
    @Column()
    cpf: string;

    @Column()
    saldo: number;

    @Column()
    token: string;

    @Exclude()
    @CreateDateColumn({type: 'timestamp'})
    data_criacao: Date

    @OneToMany(() => Transacao, transacao => transacao.usuario_enviante)
    transacoes_enviadas: Transacao[];

    @OneToMany(() => Transacao, transacao => transacao.usuario_recebedor)
    transacoes_recebidas: Transacao[];

}
