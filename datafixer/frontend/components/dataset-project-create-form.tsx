import React from 'react';
import { useForm } from 'react-hook-form';

import { Organization } from 'datafixer/core/data';

type CreateProjectFormProps = {
  createProject: Function;
  organizations: Organization[];
};

export const CreateProjectForm = ({
  createProject,
  organizations,
}: CreateProjectFormProps) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data: any) => {
    if (!organizations || !organizations.length) {
      return;
    }
    await createProject(organizations[0], data.alias, {
      title: data.projectName,
      source: data.source,
      description: data.description,
    });
  };

  if (!organizations) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Create a new dataset project</h2>
      <form className="usa-form" onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`usa-form-group ${
            errors.organization ? 'usa-form-group--error' : ''
          }`}
        >
          <label
            className={`usa-label ${
              errors.organization ? 'usa-label--error' : ''
            }`}
            htmlFor="organization"
          >
            Organization
          </label>
          <select
            className={`usa-select ${
              errors.organization ? 'usa-select--error' : ''
            }`}
            name="organization"
            required={true}
            ref={register({ required: true })}
          >
            {organizations.map(organization => (
              <option value={organization.id} key={organization.id}>
                {organization.name} ({organization.alias})
              </option>
            ))}
          </select>
        </div>

        <div
          className={`usa-form-group ${
            errors.projectName ? 'usa-form-group--error' : ''
          }`}
        >
          <label
            className={`usa-label ${
              errors.projectName ? 'usa-label--error' : ''
            }`}
            htmlFor="projectName"
          >
            Project name
          </label>
          {errors.projectName && (
            <span className="usa-error-message" role="alert">
              {errors.projectName.message}
            </span>
          )}
          <input
            className={`usa-input ${
              errors.projectName ? 'usa-input--error' : ''
            }`}
            name="projectName"
            autoCapitalize="off"
            required={true}
            type="text"
            autoComplete="off"
            spellCheck={false}
            ref={register({ required: true })}
          />
        </div>

        <div
          className={`usa-form-group ${
            errors.alias ? 'usa-form-group--error' : ''
          }`}
        >
          <label
            className={`usa-label ${errors.alias ? 'usa-label--error' : ''}`}
            htmlFor="alias"
          >
            Project alias
          </label>
          {errors.alias && (
            <span className="usa-error-message" role="alert">
              {errors.alias.message}
            </span>
          )}
          <input
            className={`usa-input ${errors.alias ? 'usa-input--error' : ''}`}
            name="alias"
            autoCapitalize="off"
            required={true}
            type="text"
            autoComplete="off"
            spellCheck={false}
            ref={register({ required: true })}
          />
        </div>

        <div
          className={`usa-form-group ${
            errors.source ? 'usa-form-group--error' : ''
          }`}
        >
          <label
            className={`usa-label ${errors.source ? 'usa-label--error' : ''}`}
            htmlFor="source"
          >
            Project source
          </label>
          {errors.source && (
            <span className="usa-error-message" role="alert">
              {errors.source.message}
            </span>
          )}
          <input
            className={`usa-input ${errors.source ? 'usa-input--error' : ''}`}
            name="source"
            autoCapitalize="off"
            required={true}
            type="text"
            autoComplete="off"
            spellCheck={true}
            ref={register({ required: true })}
          />
        </div>

        <div
          className={`usa-form-group ${
            errors.description ? 'usa-form-group--error' : ''
          }`}
        >
          <label
            className={`usa-label ${
              errors.description ? 'usa-label--error' : ''
            }`}
            htmlFor="description"
          >
            Project description
          </label>
          {errors.description && (
            <span className="usa-error-message" role="alert">
              {errors.description.message}
            </span>
          )}
          <textarea
            className={`usa-textarea ${
              errors.description ? 'usa-textarea--error' : ''
            }`}
            name="description"
            autoCapitalize="off"
            required={true}
            autoComplete="off"
            spellCheck={true}
            ref={register({ required: true })}
          />
        </div>
        <input className="usa-button" type="submit" />
      </form>
    </>
  );
};
