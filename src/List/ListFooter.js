import React from 'react';
import ListContext from './ListContext';

const ListBody = ({ FooterComponent }) => (
  <ListContext.Consumer>
    {(props) => <FooterComponent {...props} />}
  </ListContext.Consumer>
);

export default ListBody;
