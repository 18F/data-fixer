import React from 'react';

const ASSETS_ROOT = '/npm/node_modules/uswds/dist';

export const Footer = () => {
  return (
    <footer className="usa-footer" role="contentinfo">
      <div className="bg-base-lightest padding-y-1 line-height-sans-3 font-lang-4">
        <div className="grid-container">
          Data Fixer - <a href="https://10x.gsa.gov">10x</a> Phase 2
        </div>
      </div>
    </footer>
  );
};
