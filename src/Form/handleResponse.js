import getResponsePath from './getResponsePath';

const handlerResponseWithPath = (data, path, values) => {
  const responsePath = getResponsePath(path, values);

  return { item: data[responsePath][path], errors: data[responsePath].errors };
}

const handleResponse = (data, values, { props: { path, responseDataMapper, onSuccess }, setSubmitting, ...formProps }) => {
  if (!path && !responseDataMapper) {
    throw new Error(
      "Specify at least one of the following GQLForm props: `path` or `responseDataMapper`. \n" +
      "`path` prop is the key in the gql response where the excpected data is located. \n" +
      "`responseDataMapper` prop is a callback that maps gql response and should return \n" +
      "an object with errors and item keys"
    );
  }

  setSubmitting(false);

  const { errors, item } = path ?
    handlerResponseWithPath(data, path, values)
    : responseDataMapper(data);

  if (errors) {
    return Promise.reject(errors);
  }

  onSuccess(item, formProps);

  return Promise.resolve(item);
}

export default handleResponse;
