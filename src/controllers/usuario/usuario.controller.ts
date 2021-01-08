import { Controller, Get, Post, Body, ValidationPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UsuarioRepository } from 'src/repository/usuario.repository';
import { UsuarioResponse, UsuarioLoginResponse, UsuarioSaldoResponse } from 'src/api-doc/usuario.response';
import { UsuarioDto, UsuarioLoginDto, UsuarioSaldoDto } from 'src/dto/usuario.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('usuarios')
export class UsuarioController {
    constructor(
        @InjectRepository(UsuarioRepository)
        private usuarioRepo: UsuarioRepository
    ) { }

    @ApiCreatedResponse({type: UsuarioResponse})
    @Post('cadastro')
    async cadastro(@Body(new ValidationPipe({ errorHttpStatusCode: 422 })) body: UsuarioDto): Promise<any> {
        return this.usuarioRepo.cadastrar(body);
    }

    @ApiOkResponse({type: UsuarioLoginResponse})
    @Post('login')
    async login(@Body(new ValidationPipe({ errorHttpStatusCode: 422 })) body: UsuarioLoginDto): Promise<any> {
        return this.usuarioRepo.login(body);
    }

    @ApiCreatedResponse({type: UsuarioSaldoResponse})
    @Post('saldo')
    async saldo(@Body(new ValidationPipe({ errorHttpStatusCode: 422 })) body: UsuarioSaldoDto): Promise<any> {
        return this.usuarioRepo.saldo(body.token);
    }

    @Get() // Debug
    async lista(@Body(new ValidationPipe({ errorHttpStatusCode: 422 })) body: any): Promise<any> {
        return this.usuarioRepo.find();
    }
}
