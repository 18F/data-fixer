import React from 'react';

import { SessionHook } from '../hooks/session';
import { newProject, UpdateLocation } from '../routes';
import { Link } from './link';

const ASSETS_ROOT = '/npm/node_modules/uswds/dist';

export const Header = ({
  session,
  updateLocation,
}: {
  session: SessionHook;
  updateLocation: UpdateLocation;
}) => {
  return (
    <header className="usa-header usa-header--extended">
      <div className="usa-navbar">
        <div className="usa-logo">
          <em className="usa-logo__text">
            <a href="/" title="Home" aria-label="Home">
              Data Fixer 10x Prototype
            </a>
          </em>
        </div>
        <button className="usa-menu-btn">Menu</button>
      </div>
      <nav aria-label="Primary navigation" className="usa-nav">
        <div className="usa-nav__inner">
          <button className="usa-nav__close">
            <img
              src={`${ASSETS_ROOT}/img/close.svg`}
              role="img"
              alt="close"
            ></img>
          </button>
          <div className="usa-nav__secondary">
            <ul className="usa-nav__secondary-links">
              {session.data.sessionToken === null ? (
                <li className="usa-nav__secondary-item">
                  <button
                    className="usa-button usa-button--unstyled"
                    onClick={() => {
                      session.logIn({ authDetails: 'here' });
                    }}
                  >
                    Log in
                  </button>
                </li>
              ) : (
                <>
                  <li className="usa-nav__secondary-item">
                    <Link to={newProject} updateLocation={updateLocation}>
                      New Project
                    </Link>
                  </li>
                  <li className="usa-nav__secondary-item">
                    <button
                      className="usa-button usa-button--unstyled"
                      onClick={session.logOut}
                    >
                      Log out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
