import React from 'react';

import { Location } from 'datafixer/core/routes';

import { Banner } from './banner';
import { Footer } from './footer';
import { Header } from './header';
import { SessionHook } from '../hooks/session';

type LayoutContext = {
  updateLocation: (location: Location) => void;
};

export const Layout = ({
  ctx,
  children,
  session,
}: {
  ctx: LayoutContext;
  children: React.ReactNode;
  session: SessionHook;
}) => {
  return (
    <>
      <Banner />
      <Header ctx={{ updateLocation: ctx.updateLocation }} session={session} />
      <div className="grid-container">{children}</div>
      <Footer ctx={{ updateLocation: ctx.updateLocation }} />
    </>
  );
};
