import { withApollo } from 'react-apollo';
import handleErrors from './Form/handleErrors';
import { compose, withHandlers } from 'recompose';

/**
 * import { withDeleteHandler } from './crud';
 *
 * const DeleteButton = ({ label, onDelete }) =>
 *   <button type="button" className="btn-text" onClick={onDelete}>{label}</button>;
 * export default withDeleteHandler(DeleteButton);
 *
 *
 * Example with cache update. Uses update mutation callback
 * <DeleteButton
 *   id={id}
 *   mutation={deleteQuery}
 *   resource={`${notableResource}Note`}
 *   label="Delete"
 *   update={(cache) => deleteFromList(cache, listQuery, listPath, (note) => note.id == id)}
 *   onErrors={(errors) => alert(errors.generalError)}
 * />
 *
 * Example with onDelete callback
 * <DeleteButton
 *   id={id}
 *   mutation={DELETE_ACCOUNT}
 *   resource="account"
 *   label="Delete account"
 *   onDelete={() => Router.pushRoute('accounts')}
 *   onErrors={(errors) => alert(errors.generalError)}
 *   />
 */


const withDeleteHandler = ({ id, resource, client, mutation, onDelete, onErrors, update }) => () => {
  client.mutate({
    mutation: mutation,
    variables: { input: { id: id } },
    update: update
  }).then((resp) => {
    const deletePath = `delete${resource.charAt(0).toUpperCase() + resource.slice(1)}`;
    const errors = resp.data[deletePath].errors;

    if (errors) { return Promise.reject(errors); }

    const deletedItem = resp.data[deletePath][resource];

    if (typeof onDelete === 'function') onDelete(deletedItem);

    return Promise.resolve(deletedItem);
  }).catch((errors) => handleErrors(errors, { setErrors: (errors) => onErrors(errors) }));
};

export default compose(
  withApollo,
  withHandlers({
    onDelete: withDeleteHandler
  })
);
