import React from 'react';
import { render } from 'react-dom';
import 'uswds';

import { GetDataSetService } from 'datafixer/core/services';

import { DataInfo } from './components/data-info';
import { DataTable } from './components/data-table';
import { DataConsumers } from './components/data-consumers';
import { DataSchema } from './components/data-schema';
import { DataSources } from './components/data-sources';
import { DataVersions } from './components/data-versions';
import { Footer } from './components/footer';
import { Header } from './components/header';

const App = () => {
  return (
    <>
      <Header />
      <div className="grid-container">
        <div className="grid-row">
          <DataInfo
            title="Wisconsin DMV Test Dataset"
            source="Wisconsin DMV"
            description="Comprehensive list of all road closures on state and county highways."
            lastModified={new Date()}
          />
        </div>
        <div className="grid-row">
          <div className="grid-col-12 mobile-lg:grid-col-4">
            <DataVersions thisVersion="3" versions={['1', '2', '3', '4']} />
          </div>
          <div className="grid-col-12 mobile-lg:grid-col-4">
            <DataSources urls={['/source-data-1.csv', '/source-data-2.csv']} />
          </div>
          <div className="grid-col-12 mobile-lg:grid-col-4">
            <DataConsumers
              urls={['/derived-data-1.csv', '/derived-data-2.csv']}
            />
          </div>
        </div>
        <div className="grid-row">
          <DataTable caption="Browse this data" />
        </div>
        <div className="grid-row">
          <div className="grid-col-6">
            <DataSchema />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const RenderPage = (getDataSet: GetDataSetService) => () => {
  return render(App(), document.getElementById('root'));
};
