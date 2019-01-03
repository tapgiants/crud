import { compose } from 'recompose';
import withPagingParams from './withPagingParams'
import withFilter from './withFilter'

const withListParams = (fields) => compose(
  withPagingParams,
  withFilter(fields),
);

export default withListParams;
