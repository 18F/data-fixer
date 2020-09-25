import { AuthenticationService } from 'datafixer/core/authentication';
import { DatasetService } from 'datafixer/core/data';
import { LocationService } from 'datafixer/core/routes';

import { HomePresenter } from './home';
import { DatasetPresenter } from './dataset';
import { DatasetProjectPresenter } from './dataset-project';
import { DatasetUploadPresenter } from './dataset-upload';
import { OrganizationPresenter } from './organization';
import { ProjectCreatePresenter } from './project-create';
import { SessionPresenter } from './session';

type AppContext = {
  authenticationService: AuthenticationService;
  datasetService: DatasetService;
  locationService: LocationService;
  localStorage: Storage;
};

export const Presenter = (ctx: AppContext) => {
  const presenter: {
    dataset: DatasetPresenter;
    datasetProject: DatasetProjectPresenter;
    datasetUpload: DatasetUploadPresenter;
    home: HomePresenter;
    newDatasetProject: ProjectCreatePresenter;
    organization: OrganizationPresenter;
    session: SessionPresenter;
  } = {
    dataset: DatasetPresenter({
      getDataset: ctx.datasetService.getDataset,
      getDatasetProject: ctx.datasetService.getDatasetProject,
      locationService: ctx.locationService,
    }),
    datasetProject: DatasetProjectPresenter({
      getDatasetProject: ctx.datasetService.getDatasetProject,
      locationService: ctx.locationService,
    }),
    datasetUpload: DatasetUploadPresenter({
      createMockDataset: ctx.datasetService.createMockDataset,
      locationService: ctx.locationService,
    }),
    home: HomePresenter({
      getFeaturedProjects: ctx.datasetService.getFeaturedProjects,
      locationService: ctx.locationService,
      resetFactoryDefaults: ctx.datasetService.resetFactoryDefaults,
    }),
    newDatasetProject: ProjectCreatePresenter({
      createDatasetProject: ctx.datasetService.createDatasetProject,
      getOrganizations: ctx.datasetService.getOrganizations,
    }),
    organization: OrganizationPresenter({
      getOrganization: ctx.datasetService.getOrganization,
      locationService: ctx.locationService,
    }),
    session: SessionPresenter({
      authenticationService: ctx.authenticationService,
      localStorage: ctx.localStorage,
    }),
  };
  return presenter;
};
export type Presenter = ReturnType<typeof Presenter>;
