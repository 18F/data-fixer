import React from 'react';
import { useStore } from 'effector-react';

import { OrganizationPresenter } from '../presenter/organization';

type OrganizationPageProps = {
  presenter: OrganizationPresenter;
};

export const OrganizationPage = ({ presenter }: OrganizationPageProps) => {
  const organization = useStore(presenter.organization);

  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{organization.name}</h1>
    </>
  );
};
