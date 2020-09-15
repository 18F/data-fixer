import { useState, useEffect } from 'react';

import {
  DatasetProject,
  OrganizationAlias,
  ProjectAlias,
} from 'datafixer/core/data';
import { GetDatasetProjectService } from 'datafixer/core/data';

export const useDatasetProject = (
  organizationAlias: OrganizationAlias,
  alias: ProjectAlias,
  getDatasetProject: GetDatasetProjectService
) => {
  const [datasetProject, setDatasetProject] = useState<
    DatasetProject | undefined
  >();

  useEffect(() => {
    getDatasetProject(organizationAlias, alias).then(project => {
      return setDatasetProject(project);
    });
  }, [organizationAlias, alias]);

  return datasetProject;
};
