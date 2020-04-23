import React from 'react';
import { ApolloWrapper } from '@tapgiants/graphql';
import gql from 'graphql-tag';
import { List } from '@tapgiants/crud';


const INDUSTRIES = gql`
  query($filter: IndustryFilterInput, $input: ListInput) {
    industries(input: $input, filter: $filter) {
      list {
        id
        name
      }
    }
  }
`;

export default () => (
  <ApolloWrapper uri="http://localhost:4001/api">
    <List
      HeaderComponent={({ list }) => {
        console.log('Result from the executed query', list);

        return (
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        );
      }}
      FooterComponent={({ list }) => <div>Total: {list.length}</div>}
      renderItem={(item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
        </tr>
      )}
      query={INDUSTRIES}
      variables={{ first: 30, after: '', before: '' }}
      filter={{}}
      path='industries'
    />
  </ApolloWrapper>
);
