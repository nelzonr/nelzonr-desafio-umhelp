## Descrição

#### Desafio UmHelp

API Rest para registro de contas e transações financeiras desenvolvido com:

- [NodeJS][nodejs]
- [Express][express]
- [Typescript][typescript]
- [TypeORM][typeorm]
- [NestJS][nestjs]
- [MySQL][mysql]



## Endpoints

|                |Link                          |Parametros                         |
|----------------|-------------------------------|-----------------------------|
|**Cadastro de conta**| https://api-umhelp.herokuapp.com/usuarios/cadastro | `{"nome": "Teste", "cpf": "1", "saldo": 9.99}` |
|**Autenticação**| https://api-umhelp.herokuapp.com/usuarios/login |`{"id": 11, "cpf": 2}` |
|**Cadastro de transação**| https://api-umhelp.herokuapp.com/transacoes/cadastro | `{"token": "emh9p9qqvxlvdbkowdvxb", "id_usuario_recebedor": 2,"valor": 0.11}` |
|**Estorno de transação**| https://api-umhelp.herokuapp.com/transacoes/estorno | `{"token": "emh9p9qqvxlvdbkowdvxb", "id_transacao": 2}` |
|**Busca de transações por data**| https://api-umhelp.herokuapp.com/transacoes/busca | `{"data_inicio": "2021-01-10", "data_fim": "2021-01-11"}` |
|**Visualização de saldo**| https://api-umhelp.herokuapp.com/usuarios/saldo | `{"token": "emh9p9qqvxlvdbkowdvxb"` |
||||
|***Documentação / Playground***| https://api-umhelp.herokuapp.com/documentacao ||
|***Lista Usuários***| https://api-umhelp.herokuapp.com/usuarios |  *(endpoint apenas para debug)* |
|***Lista Transações***| https://api-umhelp.herokuapp.com/transacoes | *(endpoint apenas para debug)* |

[nodejs]: https://nodejs.org/
[express]: https://expressjs.com/
[typescript]: https://www.typescriptlang.org/
[typeorm]: https://typeorm.io/
[nestjs]: https://nestjs.com/
[mysql]: https://www.mysql.com/

