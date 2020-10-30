import Knex from 'knex';

import {
  WISCONSIN_PROJECT,
  MINNESOTA_PROJECT,
  DOT_PROJECT,
  COVID_AUSTRALIA,
} from './02_mock_projects';

// Raw data - not in the database, but here for reference:
const WISCONSIN_DATASET_V1_DATA = [
  ['Road', 'Start Mile', 'End Mile', 'Description'],
  ['60', '10', '12', 'Repaving, est. 10/01/2020 - 10/30/2020'],
  ['51', '87', '87', 'Accident, multi-vehicle'],
  ['151', '5', '12', 'Bridge construction, detour highway 12'],
];
const WISCONSIN_DATASET_V2_DATA = [
  ['Road', 'Start Mile', 'End Mile', 'Description'],
  ['60', '10', '12', 'Repaving, est. 10/01/2020 - 10/30/2020'],
  ['151', '5', '12', 'Bridge construction, detour highway 12'],
  ['I90', '61', '63', 'Exit 61 ramp closure'],
  ['30', '87', '87', 'Accident, multi-vehicle'],
];
const MINNESOTA_DATASET_V1_DATA = [
  ['Road', 'Start Mile', 'End Mile', 'Description'],
  ['Interstate 94', '98', '98', 'Accident reported'],
  ['Interstate 35', '55', '59', 'Flooding'],
  ['Minnesota 3', '12', '19', 'Flooding'],
  ['Minnesota 39', '35', '44', 'Flooding'],
  ['Minnesota 44', '17', '21', 'Flooding'],
  ['Minnesota 61', '54', '54', 'Accident reported'],
  ['Minnesota 93', '89', '91', 'Flooding'],
];
const DOT_DATASET_V1_DATA = [
  ['State', 'Road', 'Start Mile', 'End Mile', 'Description'],
  ['WI', '60', '10', '12', 'Repaving, est. 10/01/2020 - 10/30/2020'],
  ['WI', '51', '87', '87', 'Accident, multi-vehicle'],
  ['WI', '151', '5', '12', 'Bridge construction, detour highway 12'],
  [
    'MN',
    { value: 'Interstate 94', suggestion: 'I94' },
    '98',
    '98',
    'Accident reported',
  ],
  ['MN', { value: 'Interstate 35', suggestion: 'I35' }, '55', '59', 'Flooding'],
];
const DOT_DATASET_V2_DATA = [
  ['State', 'Road', 'Start Mile', 'End Mile', 'Description'],
  ['WI', '60', '10', '12', 'Repaving, est. 10/01/2020 - 10/30/2020'],
  ['WI', '151', '5', '12', 'Bridge construction, detour highway 12'],
  ['WI', 'I90', '61', '63', 'Exit 61 ramp closure'],
  ['WI', '30', '87', '87', 'Accident, multi-vehicle'],
  [
    'MN',
    { value: 'Interstate 94', suggestion: 'I94' },
    '98',
    '98',
    'Accident reported',
  ],
  ['MN', { value: 'Interstate 35', suggestion: 'I35' }, '55', '59', 'Flooding'],
  ['MN', { value: 'Minnesota 3', suggestion: 'MN3' }, '12', '19', 'Flooding'],
  ['MN', { value: 'Minnesota 39', suggestion: 'MN39' }, '35', '44', 'Flooding'],
  ['MN', { value: 'Minnesota 44', suggestion: 'MN44' }, '17', '21', 'Flooding'],
  [
    'MN',
    { value: 'Minnesota 61', suggestion: 'MN61' },
    '54',
    '54',
    'Accident reported',
  ],
  ['MN', { value: 'Minnesota 93', suggestion: 'MN93' }, '89', '91', 'Flooding'],
];
const COVID_AUSTRALIA_DATASET_V1_DATA = [
  [
    'Province State',
    'Country Region',
    'Latitude',
    'Longitude',
    'Last Update',
    'Confirmed Cases',
    'Recovered Cases',
  ],
  [
    'Australian Capital Territory',
    { value: 'Austraia', suggestion: 'Australia' },
    '-35.4735',
    '149.0124',
    '2020-08-20 04:27:43',
    { value: '0113', suggestion: '113' },
    '110',
  ],
  [
    'New South Wales',
    { value: 'Australa', suggestion: 'Australia' },
    '-33.8688',
    '151.2093',
    '2020-08-20 04:27:43',
    '3971',
    '2995',
  ],
  [
    'Northern Territory',
    { value: 'Austria', suggestion: 'Australia' },
    '-12.4634',
    '130.8456',
    { value: '02020-08-20 04:27:43', suggestion: '2020-08-20 04:27:43' },
    '33',
    '31',
  ],
  [
    'Queensland',
    { value: 'Anstralia', suggestion: 'Australia' },
    '-27.4698',
    '153.0251',
    '2020-08-20 04:27:43',
    '1093',
    '1081',
  ],
  [
    'South Australia',
    { value: 'Aust', suggestion: 'Australia' },
    '-34.9285',
    '138.6007',
    '2020-08-20 04:27:43',
    { value: '0462', suggestion: '462' },
    '452',
  ],
  [
    'Tasmania',
    { value: 'Australa', suggestion: 'Australia' },
    '-42.8821',
    '147.3272',
    '2020-08-20 04:27:43',
    '230',
    '216',
  ],
  [
    'Victoria',
    { value: 'Austr', suggestion: 'Australia' },
    '-37.8136',
    '144.9631',
    { value: '22020-08-20 04:27:43', suggestion: '2020-08-20 04:27:43' },
    '17683',
    '9729',
  ],
  [
    'Western Australia',
    { value: 'Aussie', suggestion: 'Australia' },
    '-31.9505',
    '115.8605',
    '2020-08-20 04:27:43',
    '651',
    '633',
  ],
];

const WISCONSIN_DATASET_V1 = {
  id: 'c072c0d8-1af7-4e9c-b737-f572a28c9a5d',
  project_id: WISCONSIN_PROJECT.id,
  format: 'CSV',
};
const WISCONSIN_DATASET_V2 = {
  id: '4db15d2a-1976-4012-8d87-ab0e917476be',
  project_id: WISCONSIN_PROJECT.id,
  format: 'CSV',
};
const MINNESOTA_DATASET_V1 = {
  id: '86e1b950-af83-4063-9d6f-694fff299019',
  project_id: MINNESOTA_PROJECT.id,
  format: 'CSV',
};
const DOT_DATASET_V1 = {
  id: '3c7b24e1-696b-4490-9deb-5140f07993df',
  project_id: DOT_PROJECT.id,
  format: 'CSV',
};
const DOT_DATASET_V2 = {
  id: '7c81fc21-fefd-4dc8-9df5-e0aeb571b293',
  project_id: DOT_PROJECT.id,
  format: 'CSV',
};
const COVID_AUSTRALIA_DATASET_V1 = {
  id: '9d06b1d0-032b-11eb-a84f-f218984f7ebf',
  project_id: COVID_AUSTRALIA.id,
  format: 'CSV',
};

/**
 * This adds several mock datasets.
 * These are mimicking the mock data used in the initial prototype.
 */
export const seed = async (db: Knex) => {
  // Deletes ALL existing entries
  await db('datasets')
    .del()
    .then(function () {
      // Inserts seed entries
      return db('datasets').insert([
        WISCONSIN_DATASET_V1,
        WISCONSIN_DATASET_V2,
        MINNESOTA_DATASET_V1,
        DOT_DATASET_V1,
        DOT_DATASET_V2,
        COVID_AUSTRALIA_DATASET_V1,
      ]);
    });
};
