# What is @tapgiants/crud

@tapgiants/crud is build on the top of Tap Giants [Form](https://github.com/tapgiants/form).
It provides GraphQL CRUD operations.

The usage of this package requires keeping of the GraphQL query conventions described in the [GraphQL conventions](#graphql-conventions) section.

## Installation

Install peer dependencies:
```bash
yarn add @tapgiants/form @tapgiants/graphql react-apollo recompose apollo-boost graphql
```

Install @tapgiants/crud

```bash
yarn add @tapgiants/crud
```

## GQLForm API

Description...

### Props

Props...


### GQLForm example

```jsx
```

## List API

`List` component renders a data table list returned from the execution of the passed `query` prop.

You can decorate the result by using the following components: `HeaderComponent`, `renderItem` and `FooterComponent`.

### Props

#### `query`: Object
A GrahqQL query created with the [`graphql-tag`](https://github.com/apollographql/graphql-tag) package.

#### `variables`: Object
Object with variables that will be passed to the GraphQL `query`.

#### `filter`: Object
`filter` is an object that holds filter variables. It will be merged with `variables` prop.

#### `path`: String
The key under which the list result is nested.

#### `HeaderComponent`: React.Component
Use in order to add table head row. It receives `list` prop
which contains the `query` result.

#### `FooterComponent`: React.Component
Use in order to add list footer. It receives `list` prop
which contains the `query` result.

#### `renderItem`: Function: React.Component
Use in order to decorate each item form the `query` result.
It receives single argument which represents an item from the `query` result.
Must return react component.

### List example

```jsx
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

```

## Pagination API

Adds previous and next pagination links and the total items count.

### Props

#### `totalCount`: Integer
The total items count that will be displayed.

#### `pageInfo`: Object
Pagination information that indicates if there is a next or a previous page and the current cursor position.

> For more information
about pageInfo type check [GraphQL conventions](#graphql-conventions) section.

### `route`: String
Route that will be used from the `LinkComponent` in order to paginate the list.

### `params`: Object
Additional http query params that will be added to the `route`.

### `LinkComponent`: React.Component
Link component that will be used to build the next and previous links. It receives `route` and `params` props. `params` prop contains the cursor information and all the additional parameters.

### Pagination example

```jsx
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
```

## withDeleteHandler API

Description...

### Props

Props...


### withDeleteHandler example

```jsx
```

## withFilterForm API

Description...

### Props

Props...


### withFilterForm example

```jsx
```

## Params API

Description...

### withFilter
Description...

### withPagingParams
Description...

### withListParams
Description...

### withId
Description...

### Params example

```jsx
```

## GraphQL conventions

Add link to an external repo that describes all the conventions.

## Development

Link the package from your target project and run `yarn start`. This will start the webpacker watcher.

Once you are satisfied with your changes, use `yarn publish` to push the new version to npmjs.org.

