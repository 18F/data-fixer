import React from 'react';

import { Banner } from './banner';
import { Footer } from './footer';
import { Header } from './header';
import { SessionHook } from '../hooks/session';
import { Location } from '../routes';

export const Layout = ({
  children,
  session,
  updateLocation,
}: {
  children: React.ReactNode;
  session: SessionHook;
  updateLocation: (location: Location) => void;
}) => {
  return (
    <>
      <Banner />
      <Header session={session} updateLocation={updateLocation} />
      <div className="grid-container">{children}</div>
      <Footer updateLocation={updateLocation} />
    </>
  );
};
