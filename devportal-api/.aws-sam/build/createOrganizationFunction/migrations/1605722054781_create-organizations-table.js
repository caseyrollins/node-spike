/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createExtension('uuid-ossp');
  pgm.createTable('organizations', {
    id: {
      type: 'serial',
      notNull: true,
      primaryKey: true,
    },
    uuid: {
      type: 'uuid',
      notNull: true,
      unique: true,
      default: pgm.func('uuid_generate_v4 ()')
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });
};

exports.down = pgm => {
  pgm.dropTable('organizations');
  pgm.dropExtension('uuid-ossp');
};
