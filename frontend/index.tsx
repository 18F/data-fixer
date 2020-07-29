import React from 'react';
import { render } from 'react-dom';
import 'uswds';

import { Header } from './components/header.component';

const App = () => {
  return (
    <>
      <Header />
    </>
  );
};

export const getRenderPage = () => () => {
  return render(App(), document.getElementById('root'));
};
