import { GetDataSetGateway } from './gateways';

export const GetDataSetService = (getDataSet: GetDataSetGateway) => async (
  dataSetId: string
) => {
  return getDataSet(dataSetId);
};

export type GetDataSetService = ReturnType<typeof GetDataSetService>;
