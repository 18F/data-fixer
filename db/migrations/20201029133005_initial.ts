import Knex from 'knex';

export const up = async (db: Knex) => {
  await db.schema
    .createTable('organizations', organizations => {
      organizations.uuid('id').notNullable().primary();
      organizations.string('alias').notNullable();
      organizations.string('name').notNullable();
    })
    .createTable('projects', projects => {
      projects.uuid('id').notNullable().primary();
      projects.string('alias').notNullable();
      projects
        .uuid('organization_id')
        .references('id')
        .inTable('organizations')
        .notNullable()
        .onDelete('cascade');
      projects.enu('source_type', ['upload', 'mirror', 'derived']);
      projects.string('title').notNullable();
      projects.string('description').notNullable();
    })
    .createTable('datasets', datasets => {
      // UUID that corresponds to the subpath of DATAFIXER_DATASET_ROOT
      datasets.uuid('id').notNullable().primary();
      datasets
        .uuid('project_id')
        .references('id')
        .inTable('projects')
        .notNullable();
      datasets.string('format').notNullable();
    });
};

export const down = async (db: Knex) => {
  await db.schema
    .dropTable('organizations')
    .dropTable('projects')
    .dropTable('datasets');
};
