import { useState, useEffect } from 'react';

import { Dataset, DatasetId } from 'datafixer/core/data';
import { GetDatasetService } from 'datafixer/core/data';

export const useDataset = (
  datasetId: DatasetId,
  getDataset: GetDatasetService
) => {
  const [dataset, setDataset] = useState<Dataset | undefined>();

  useEffect(() => {
    getDataset(datasetId).then(data => {
      return setDataset(data);
    });
  }, [datasetId]);

  return dataset;
};
