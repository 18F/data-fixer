import { useStoreMap } from 'effector-react';

export const usePresenter = <T extends Function>(presenter: T) => {
  const ui = presenter();
  return {
    ...ui,
    stores: useStoreMap(ui.stores),
  };
};
