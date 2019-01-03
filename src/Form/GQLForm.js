import React from 'react';
import { Mutation, Query } from 'react-apollo';
import withFormAction from './withFormAction';

const FormWithAction = ({ MarkupComponent, submitQuery, update, ...props }) => {
  const Form = withFormAction(MarkupComponent);

  return (
    <Mutation mutation={submitQuery} update={update}>
      {(form) => <Form form={form} {...props} />}
    </Mutation>
  );
};

FormWithAction.defaultProps = {
  rawValues: {}
};

const FormWithGQLValues = ({ id, query, path, ...props }) => (
  <Query query={query} variables={{ input: { id: id } }}>
    {({ loading, data }) => {
      if (loading) return "Loading...";

      return (
        <FormWithAction
          rawValues={data[path]}
          path={path}
          {...props}
        />
      );
    }}
  </Query>
);

/**
 * - responseDataMapper prop should be passed if there is not path props and vice versa
 * - onSuccess receives the response from gql server as a first argumrnt and formProps as a second
 * - update - Apollo Mutation callback for cache update
 *
 * Example with no valuesQuery and responseDataMapper
 *
 * <GQLForm
 *   fields={[
 *     { name: 'contactId', default: '' },
 *     { name: 'data', default: [{ position: 'Position Title' , accountId: 2 }] }
 *   ]}
 *   submitQuery={submitQuery} // mutation query
 *   responseDataMapper={(data) => ({
 *     errors: data.path.errors,
 *     item: data.path.list
 *   })}
 *   MarkupComponent={FormMarkup}
 *   onSuccess={() => Router.pushRoute('route_to', { id: id })}
 *   {...props}
 * />
 *
 * Example with id & valuesQuery and path. Both props are used in order to initial load the
 * values from a GraphQL server
 *
 * <GQLForm
 *   fields={[
 *     { name: 'contactId', default: '' },
 *     { name: 'data', default: [{ position: 'Position Title' , accountId: 2 }] }
 *   ]}
 *   submitQuery={submitQuery} // mutation query
 *   valuesQuery={valuesQuery} // used to load the initial data in the form
 *   id={id} // used by valuesQuery
 *   path='contact'
 *   MarkupComponent={FormMarkup}
 *   onSuccess={() => Router.pushRoute('route_to')}
 *   {...props}
 * />
 */

const GQLForm = ({ id, path, valuesQuery, ...props }) =>
  (id && valuesQuery ?
    <FormWithGQLValues query={valuesQuery} path={path} id={id} {...props} />
    : <FormWithAction path={path} {...props} />
  );

export default GQLForm;
