import { configure, storiesOf } from '@storybook/react';
// @ts-ignore
import storybook from '@storybook/react/standalone';
import * as React from 'react';

//import Header from 'datafixer/frontend/components/header.story';
console.log('args', process.argv);

configure(() => {
  storiesOf('Category 1', module).add('Test 1', () => (
    <div>Category 1 - Test 1</div>
  ));
  storiesOf('Category 2', module)
    .add('Test 1', () => <div>Category 2 - Test 1</div>)
    .add('Test 2', () => <div>Category 2 - Test 2</div>);
}, module);

storybook({
  mode: 'dev',
  port: 8008,
  configDir: './configDir',
});
