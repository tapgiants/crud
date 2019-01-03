import { formatGQLErrors } from '@tapgiants/graphql';

const handleErrors = (errors, { setErrors }) => {
  if (!Array.isArray(errors)) throw errors.message;

  setErrors(formatGQLErrors(errors));
}

export default handleErrors;
