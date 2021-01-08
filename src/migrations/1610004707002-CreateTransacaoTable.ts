import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTransacaoTable1610004707002 implements MigrationInterface {

    private options: any = {
        name: 'transacao',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'id_usuario_envio',
                type: 'int',
            },
            {
                name: 'id_usuario_recebedor',
                type: 'int'
            },
            {
                name: 'valor',
                type: 'decimal',
                precision: 12,
                scale: 2,
                default: 0
            },
            {
                name: 'estornado',
                type: 'boolean',
                default: false
            },
            {
                name: 'data_processamento',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP'
            }
        ]
    };

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(this.options));
        await queryRunner.createForeignKey(this.options.name, new TableForeignKey({
            columnNames: ['id_usuario_envio'],
            referencedTableName: 'usuario',
            referencedColumnNames: ['id']
        }));
        await queryRunner.createForeignKey(this.options.name, new TableForeignKey({
            columnNames: ['id_usuario_recebedor'],
            referencedTableName: 'usuario',
            referencedColumnNames: ['id']
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.options.name);
    }

}
