import React from 'react';
import { ApolloWrapper, deleteFromList } from '@tapgiants/graphql';
import gql from 'graphql-tag';
import { List, withDeleteHandler } from '@tapgiants/crud';

const INDUSTRIES = gql`
  query($filter: IndustryFilterInput, $input: ListInput) {
    industries(input: $input, filter: $filter) @connection(key: "industries") {
      list {
        id
        name
      }
    }
  }
`;

const DELETE_INDUSTRY = gql`
  mutation($input: IdInput!) {
    deleteIndustry(input: $input) {
      industry{
        id
        name
      }
      errors {
        key
        message
      }
    }
  }
`;

const DeleteButtonMarkup = ({ label, onDelete, className }) =>
  <button type="button" onClick={onDelete} className={className}>{label}</button>;

const DeleteButton = withDeleteHandler(DeleteButtonMarkup)

export default () => (
  <ApolloWrapper uri="http://localhost:4001/api">
    <List
      HeaderComponent={({ list }) => {
        console.log('Result from the executed query', list);

        return (
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        );
      }}
      FooterComponent={({ list }) => <div>Total: {list.length}</div>}
      renderItem={(item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>
            <DeleteButton
              id={item.id}
              mutation={DELETE_INDUSTRY}
              resource="industry"
              label="Delete"
              onDelete={(deletedItem) => console.log(deletedItem)}
              onErrors={(errors) => console.log(errors.generalError)}
              update={(cache) =>
                deleteFromList(
                  cache,
                  INDUSTRIES,
                  'industries',
                  (industry) => industry.id == item.id)
              }
            />
          </td>
        </tr>
      )}
      query={INDUSTRIES}
      variables={{ first: 30, after: '', before: '' }}
      filter={{}}
      path='industries'
    />
  </ApolloWrapper>
);
