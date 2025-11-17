import { MigrationInterface, QueryRunner, Table, TableCheck } from 'typeorm';

export class CreateTasksTable1762882406662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default:
              queryRunner.connection.options.type === 'sqlite'
                ? "(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-' || '4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab', abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))"
                : 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'dueDate',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'text',
            default: `'pending'`,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default:
              queryRunner.connection.options.type === 'sqlite'
                ? "(datetime('now'))"
                : 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default:
              queryRunner.connection.options.type === 'sqlite'
                ? "(datetime('now'))"
                : 'CURRENT_TIMESTAMP',
            onUpdate:
              queryRunner.connection.options.type === 'sqlite'
                ? undefined
                : 'CURRENT_TIMESTAMP',
          },
        ],
        checks: [
          new TableCheck({
            expression:
              "status IN ('pending', 'in_progress', 'done', 'overdue')",
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
