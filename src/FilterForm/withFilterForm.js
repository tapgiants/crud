import { withForm } from '@tapgiants/form';
import buildHttpFilterParams from '../params/buildHttpFilterParams';

const handleFilter = (values, { props: { router, route, params = {} } }) => {
  if (!route) throw new Error(
    'FormFilter route prop not specified.' +
    ' route prop should be valid route path.'
  );

  router.pushRoute(route, { ...params, ...buildHttpFilterParams(values) });
};

const withFilterForm = withForm({
  mapPropsToValues: ({ fields, filterState }) => {
    return fields.reduce((currentProps, field) =>
      ({ ...currentProps, ...{ [field.name]: filterState[field.name] || field.default } }), {});
  },
  handleSubmit: handleFilter
});

export default withFilterForm;
