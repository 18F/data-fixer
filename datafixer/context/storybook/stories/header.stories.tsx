import 'uswds';
import 'datafixer/frontend/bundle.css';

import React from 'react';

import { Banner } from 'datafixer/frontend/components/banner';

export default {
  component: Banner,
  title: 'Banner',
};

export const Basic = () => <Header />;

Basic.story = {
  name: 'Standard usa-banner component',
};
