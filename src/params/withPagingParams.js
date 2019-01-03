import { withProps, compose } from 'recompose';

const withPagingParams = compose(
  withProps(({ after = '', before = '' }) => ({
    pagingParams: {
      after,
      before
    }
  }))
);

export default withPagingParams;
