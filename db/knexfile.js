/**
 * Initialize ts-node, so all our migrations and seeds may be written in
 * Typescript.
 */
require('ts-node').register();

module.exports = {
  /**
   * Initially, just use sqlite3 while the general structure is scaffolded out.
   */
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
  },

  /*
  production: {
    client: 'postgresql',
    connection: {
      database: 'datafixer',
      user: 'postgres',
      password: 'postgres',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  */
};
