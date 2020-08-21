import React, { useState } from 'react';

import {
  AuthenticationDetails,
  AuthenticationService,
  SessionToken,
} from 'datafixer/core/auth';

import { Banner } from './banner';
import { Footer } from './footer';
import { Link } from './link';
import { home, Location } from '../routes';

export const Layout = ({
  children,
  logOut,
  sessionToken,
  logIn,
  updateLocation,
}: {
  children: React.ReactNode;
  logOut: () => void;
  sessionToken: SessionToken | null;
  logIn: (authenticationDetails: AuthenticationDetails) => void;
  updateLocation: (location: Location) => void;
}) => {
  return (
    <>
      <Banner />
      <div className="grid-container">
        <nav>
          <ul>
            <li>
              <Link to={home} updateLocation={updateLocation}>
                Home
              </Link>
            </li>
            <li>
              {sessionToken === null ? (
                <button
                  className="usa-button usa-button--unstyled"
                  onClick={() => {
                    logIn({ authDetails: 'here' });
                  }}
                >
                  Log in
                </button>
              ) : (
                <button
                  className="usa-button usa-button--unstyled"
                  onClick={logOut}
                >
                  Log out
                </button>
              )}
            </li>
          </ul>
        </nav>
        {children}
      </div>
      <Footer />
    </>
  );
};
