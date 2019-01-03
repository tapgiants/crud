import React from 'react';
import { Query } from 'react-apollo';
import ListHeader from './ListHeader';
import ListBody from './ListBody';
import ListFooter from './ListFooter';
import ListContext from './ListContext';

const List = ({
  query,
  variables,
  filter,
  path,
  HeaderComponent,
  FooterComponent,
  renderItem
}) => (
    <Query query={query} variables={{ input: variables, filter: filter }}>
      {({ loading, data }) => {
        if (loading) return 'Loading...';

        return (
          <ListContext.Provider value={{ ...data[path] }}>
            <table className="data-grid">
              <ListHeader HeaderComponent={HeaderComponent} />
              <ListBody renderItem={renderItem} />
            </table>

            {FooterComponent && <ListFooter FooterComponent={FooterComponent} />}
          </ListContext.Provider>
        );
      }}
    </Query>
  );

export default List;
