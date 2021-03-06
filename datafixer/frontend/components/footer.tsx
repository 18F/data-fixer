import React from 'react';

import { home, UpdateLocation } from 'datafixer/services/routes';
import { Link } from './link';

const ASSETS_ROOT = '/npm/node_modules/uswds/dist';

type FooterContext = {
  updateLocation: UpdateLocation;
};

export const Footer = ({ ctx }: { ctx: FooterContext }) => {
  return (
    <footer className="usa-footer usa-footer--slim" role="contentinfo">
      <div className="grid-container usa-footer__return-to-top">
        <a href="#">Return to top</a>
      </div>
      <div className="usa-footer__primary-section">
        <div className="grid-container grid-row">
          <div className="mobile-lg:grid-col-8">
            <nav className="usa-footer__nav" aria-label="Footer navigation">
              <ul className="grid-row grid-gap">
                <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                  <a
                    className="usa-footer__primary-link"
                    href="https://10x.gsa.gov"
                  >
                    About 10x
                  </a>
                </li>
                <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                  <Link
                    className="usa-footer__primary-link"
                    to={home}
                    updateLocation={ctx.updateLocation}
                  >
                    About Data Fixer
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="usa-footer__secondary-section">
        <div className="grid-container">
          <div className="usa-footer__logo grid-row grid-gap-2">
            <div className="grid-col-auto">
              <img
                className="usa-footer__logo-img"
                src="data:image/png;base64,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"
                alt="GSA"
              />
            </div>
            <div className="grid-col-auto">
              <h3 className="usa-footer__logo-heading">
                <a href="https://gsa.gov">General Services Administration</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
