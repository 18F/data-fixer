import React from 'react';

import { DatasetUploadPresenter } from '../presenter/dataset-upload';

export const DatasetUploadPage = ({
  presenter,
}: {
  presenter: DatasetUploadPresenter;
}) => {
  const location = presenter.getLocation();
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
          await presenter.createMockDataset();
        }}
      >
        Upload data
      </button>
    </div>
  );
};
