import React from 'react';
import { useStore } from 'effector-react';

import { Location } from 'datafixer/services/routes';

import { CreateProjectForm } from '../components/dataset-project-create-form';
import { ProjectCreatePresenter } from '../presenter/project-create';

type NewDatasetProjectPageContext = {
  presenter: ProjectCreatePresenter;
};

export const NewDatasetProjectPage = ({
  presenter,
}: NewDatasetProjectPageContext) => {
  const organizations = useStore(presenter.organizations);
  return (
    <CreateProjectForm
      createProject={presenter.createProject}
      organizations={organizations}
    />
  );
};
