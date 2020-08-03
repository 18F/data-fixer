import * as t from 'io-ts';

const TabularRow = t.type({
  values: t.array(t.any),
});

const TabularData = t.type({
  uri: t.string,
  columns: t.array(t.string),
  rows: t.array(TabularRow),
});

export type TabularRow = t.TypeOf<typeof TabularRow>;
export type TabularData = t.TypeOf<typeof TabularData>;

export const getTabularData = null;
