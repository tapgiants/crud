import React from 'react';
import Link from 'next/link'
import { withRouter } from 'next/router'
import { ApolloWrapper } from '@tapgiants/graphql';
import gql from 'graphql-tag';
import { List, Pagination } from '@tapgiants/crud';


const INDUSTRIES = gql`
  query($filter: IndustryFilterInput, $input: ListInput) {
    industries(input: $input, filter: $filter) {
      list {
        id
        name
      }
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

const LinkComponent = ({ children, route, params }) => (
  <Link href={{ pathname: route, query: params }}>{children}</Link>
);

const PaginatedList = ({ router: { query: { after = '', before = '' } } }) => {
  return (
    <ApolloWrapper uri="http://localhost:4001/api">
      <List
        HeaderComponent={({ list, totalCount, pageInfo }) => {
          console.log('Result from the executed query', list);
          console.log('Count of the items returned from the query', totalCount);
          console.log('Pagination info', pageInfo);

          return (
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          );
        }}
        FooterComponent={({ pageInfo, totalCount }) => (
          <Pagination
            totalCount={totalCount}
            pageInfo={pageInfo}
            route='paginated_list'
            params={{}}
            LinkComponent={LinkComponent}
          />
        )}
        renderItem={(item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
          </tr>
        )}
        query={INDUSTRIES}
        variables={{ first: 30, after: after, before: before }}
        filter={{}}
        path='industries'
      />
    </ApolloWrapper>
  );
}

export default withRouter(PaginatedList);
