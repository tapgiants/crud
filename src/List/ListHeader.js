import React from 'react';
import ListContext from './ListContext';

const ListHeader = ({ HeaderComponent }) => (
  <ListContext.Consumer>
    {(props) => (
      <thead>
        <HeaderComponent {...props} />
      </thead>
    )}
  </ListContext.Consumer>
);

export default ListHeader;
