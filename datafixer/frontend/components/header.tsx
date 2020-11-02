import { useStore } from 'effector-react';
import React from 'react';

import { newProject, UpdateLocation } from 'datafixer/services/routes';

import { Link } from './link';
import { SessionPresenter } from '../presenter/session';

const ASSETS_ROOT = '/npm/node_modules/uswds/dist';

type HeaderContext = {
  updateLocation: UpdateLocation;
};

export const Header = ({
  ctx,
  session,
}: {
  ctx: HeaderContext;
  session: SessionPresenter;
}) => {
  const sessionData = useStore(session.data);

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
              {sessionData === null || sessionData.sessionToken === null ? (
                <li className="usa-nav__secondary-item">
                  <button
                    className="usa-button usa-button--unstyled"
                    onClick={() => {
                      session.logIn({ emailAddress: 'fake@gsa.gov' });
                    }}
                  >
                    Log in
                  </button>
                </li>
              ) : (
                <>
                  <li className="usa-nav__secondary-item">
                    <Link to={newProject} updateLocation={ctx.updateLocation}>
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
