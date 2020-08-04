import 'uswds';
import 'datafixer/frontend/bundle.css';

import React from 'react';

import { Header } from 'datafixer/frontend/components/header';

export default {
  component: Header,
  title: 'Header',
};

export const Basic = () => (
  <Header />
);

Basic.story = {
  name: 'Basic header',
};
