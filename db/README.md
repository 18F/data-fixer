# Datafixer database configuration

This includes a [Knex](http://knexjs.org/)-managed database. Typescript support is added via [ts-node](https://github.com/TypeStrong/ts-node), which is configured in [knexfile.js](./knexfile.js).

During the prototyping phase, sqlite3 is configured for local development, with the intent to use Postgres in production.

- [./migrations](./migrations) - Database migrations
- [./seeds](./seeds) - Database seeds/fixtures, currently including mock data for prototyping purposes.

To use:

```bash
# A few shortcuts
yarn db:change
yarn db:migrate
yarn db:rollback
yarn db:seed
yarn db:version

# Use yarn directly.
yarn knex --help
```
