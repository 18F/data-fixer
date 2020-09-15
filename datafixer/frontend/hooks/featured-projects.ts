import { useState, useEffect } from 'react';

import { DatasetProject } from 'datafixer/core/data';
import { GetFeaturedProjectsService } from 'datafixer/core/data';

export const useFeaturedProjects = (
  getFeaturedProjects: GetFeaturedProjectsService
) => {
  const [projects, setProjects] = useState<DatasetProject[] | undefined>();

  useEffect(() => {
    getFeaturedProjects().then(projects => {
      return setProjects(projects);
    });
  }, []);

  return projects;
};
