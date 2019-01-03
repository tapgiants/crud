import { withForm } from '@tapgiants/form';
import formatVarsInput from './formatVarsInput';
import mapPropsToValuesHandler from './mapPropsToValuesHandler';
import handleResponse from './handleResponse';
import handleErrors from './handleErrors';

const handleSave = (values, props) => {
  const { props: { form } } = props;

  form({
    variables: formatVarsInput(props, values)
  }).then(({ data }) => handleResponse(data, values, props))
    .catch((errors) => handleErrors(errors, props));
};

export default (FormMarkup) => withForm({
  mapPropsToValues: mapPropsToValuesHandler,
  handleSubmit: handleSave
})(FormMarkup);
