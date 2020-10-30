import Knex from 'knex';

export const MN_DOT = {
  id: 'b8102294-766f-4bda-ad8b-6f6468a77c21',
  alias: 'mndot',
  name: 'Minnesota Department of Transportation',
};
export const WI_DOT = {
  id: 'c1ef709d-20d3-4180-89fd-213e2d2a0414',
  alias: 'widot',
  name: 'Wisconsin Department of Transportation',
};
export const US_DOT = {
  id: 'ee24d50c-f39f-4047-8fed-1fb2b20b6fd6',
  alias: 'usdot',
  name: 'United States Department of Transportation',
};
export const COVID_ORG = {
  id: '68172cc0-032b-11eb-a84f-f218984f7ebf',
  alias: 'covid19',
  name: 'National COVID-19 Statistics',
};

/**
 * This adds several mock organizations.
 * These are mimicking the mock data used in the initial prototype.
 */
export const seed = async (db: Knex) => {
  // Deletes ALL existing entries
  await db('organizations')
    .del()
    .then(function () {
      // Inserts seed entries
      return db('organizations').insert([MN_DOT, WI_DOT, US_DOT, COVID_ORG]);
    });
};
