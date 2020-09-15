import React from 'react';

import { CreateMockDatasetService } from 'datafixer/core/data';
import {
  datasetLocation,
  NewDatasetLocation,
  Router,
} from 'datafixer/core/routes';

type DatasetUploadPageContext = {
  createMockDataset: CreateMockDatasetService;
};

export const DatasetUploadPage = (props: {
  ctx: DatasetUploadPageContext;
  router: Router;
}) => {
  const location = props.router.currentLocation as NewDatasetLocation;
  return (
    <div>
      <h2>
        {location.organizationAlias} / {location.alias}
      </h2>
      <div className="usa-form-group">
        <label className="usa-label" htmlFor="file-input">
          Choose a file (any file - we'll ignore it and use mock data)
        </label>
        <input
          id="file-input"
          className="usa-file-input"
          type="file"
          name="file-input"
        />
      </div>
      <button
        className="usa-button"
        onClick={async () => {
          const datasetId = await props.ctx.createMockDataset(
            location.organizationAlias,
            location.alias
          );
          props.router.updateLocation(
            datasetLocation(
              location.organizationAlias,
              location.alias,
              datasetId
            )
          );
        }}
      >
        Upload data
      </button>
    </div>
  );
};
