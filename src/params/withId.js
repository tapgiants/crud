import { withProps, compose } from 'recompose';

const withId = compose(
  withProps(({ id }) => {
    if (!id) throw new Error('Missing http get parameter id. ');

    return { id: id };
  })
);

export default withId;
