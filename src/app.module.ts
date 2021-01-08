import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Usuario } from './models/usuario.model';
import { UsuarioRepository } from './repository/usuario.repository';
import { UsuarioController } from './controllers/usuario/usuario.controller';
import { Transacao } from './models/transacao.model';
import { TransacaoRepository } from './repository/transacao.repository';
import { TransacaoController } from './controllers/transacao/transacao.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // @ts-ignore
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Usuario, Transacao],
    }),
    TypeOrmModule.forFeature([Usuario, UsuarioRepository, Transacao, TransacaoRepository])
  ],
  controllers: [AppController, UsuarioController, TransacaoController],
  providers: [AppService],
})

export class AppModule { }
