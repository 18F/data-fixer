import Knex from 'knex';

import { US_DOT, WI_DOT, MN_DOT, COVID_ORG } from './01_mock_organizations';

export const WISCONSIN_PROJECT = {
  id: '4b56b64f-cc78-4834-87db-7a0cf50c28a6',
  alias: 'road-closures',
  organization_id: WI_DOT.id,
  source_type: 'upload',
  title: 'Wisconsin Reported Road Closures',
  description:
    'Comprehensive list of all road closures on Wisconsin state and county highways.',
};
export const MINNESOTA_PROJECT = {
  id: '14eef704-8000-4c26-8bf3-2c91c1f9e7fe',
  alias: 'road-closures',
  organization_id: MN_DOT.id,
  source_type: 'upload',
  title: 'Minnesota Reported Road Closures',
  description:
    'Comprehensive list of all road closures on Minnesota state and county highways.',
};
export const DOT_PROJECT = {
  id: 'a897f990-9e1b-428c-bf63-4585290a947e',
  alias: 'road-closures',
  organization_id: US_DOT.id,
  source_type: 'upload',
  title: 'Minnesota Reported Road Closures',
  description:
    'Comprehensive list of all road closures on Minnesota state and county highways.',
};
export const COVID_AUSTRALIA = {
  id: '8e1d55de-032b-11eb-a84f-f218984f7ebf',
  alias: 'australia',
  organization_id: COVID_ORG.id,
  source_type: 'upload',
  title: 'Australian COVID-19 statistics',
  description: 'Australian COVID-19 statistics by province',
};

/**
 * This adds several mock projects.
 * These are mimicking the mock data used in the initial prototype.
 */
export const seed = async (db: Knex) => {
  // Deletes ALL existing entries
  await db('projects')
    .del()
    .then(function () {
      // Inserts seed entries
      return db('projects').insert([
        WISCONSIN_PROJECT,
        MINNESOTA_PROJECT,
        DOT_PROJECT,
        COVID_AUSTRALIA,
      ]);
    });
};
