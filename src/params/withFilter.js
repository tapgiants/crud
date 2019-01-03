import { withProps, compose } from 'recompose';
import extractFilterValues from './extractFilterValues';
import buildHttpFilterParams from './buildHttpFilterParams';

const withFilter = (fields) => compose(
  withProps((props) => ({ filter: extractFilterValues(fields, props) })),
  withProps(({ filter }) => ({ filterHttpParams: buildHttpFilterParams(filter) }))
);

export default withFilter;
