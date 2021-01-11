import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EntityNotFoundExceptionFilter } from './exception-filters/entity-not-found.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  
  const options = new DocumentBuilder()
    .setTitle('Desafio de Programação Back-End - UmHelp')
    .setDescription('Documentação da API UmHelp')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT || 3000);
  console.log(process.env)
}
bootstrap();
