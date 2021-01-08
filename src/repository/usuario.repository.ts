import { Injectable, BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Usuario } from "../models/usuario.model";

@Injectable()
@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {

    async cadastrar(body: any) {
        if (await this.existe({cpf: body.cpf})) {
            this.erro('CPF já existe');
        } else {
            body.token = this.generateToken();
            const usuario = this.create(body);
            return this.save(usuario);
        }
    }

    async login(body: any) {
        const usuario: Usuario = await this.findOneOrFail({
            where: {
                id: body.id,
                cpf: body.cpf
                // senha: ####
            }
        });

        if (!usuario) {
            this.erro('Usuário não existe');
        }

        usuario.token = this.generateToken();
        this.update({ id: usuario.id }, usuario);

        return { token: usuario.token };
    }

    async saldo(token: string) {
        const usuario: Usuario = await this.findOneOrFail({ where: { token: token } });
        if (usuario) {
            return {saldo: usuario.saldo};
        } else {
            this.erro('Usuário não existe');
        }
    }

    async existe(dados: object) {
        const usuarios: any = await this.find({ where: dados });
        if (usuarios.length > 0) {
            return usuarios;
        } else {
            return false;
        }
    }

    private generateToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    private erro(mensagem: any) {
        throw new BadRequestException(mensagem);
    }

}
