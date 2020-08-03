export type GetDataSetGateway = (dataSetId: string) => Promise<any>;

export const getMockDataSetGateway = (
  mockData: any
): GetDataSetGateway => async (dataSetId: string) => {
  return mockData[dataSetId];
};
