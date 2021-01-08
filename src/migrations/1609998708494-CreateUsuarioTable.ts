import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateUsuarioTable1609998708494 implements MigrationInterface {

    private options: any = {
        name: 'usuario',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'nome',
                type: 'varchar',
            },
            {
                name: 'cpf',
                type: 'varchar',
                length: 11,
                unique: true
            },
            {
                name: 'saldo',
                type: 'decimal',
                precision: 12,
                scale: 2,
                default: 0
            },
            {
                name: 'token',
                type: 'varchar',
                unique: true,
                default: null
            },
            {
                name: 'data_criacao',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP'
            }
        ]
    };

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(this.options));
        await queryRunner.createIndex(this.options.name, new TableIndex({
            name: "IDX_USUARIO_CPF",
            columnNames: ["cpf"]
        }));
        await queryRunner.createIndex(this.options.name, new TableIndex({
            name: "IDX_USUARIO_TOKEN",
            columnNames: ["token"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.options.name);
    }

}
