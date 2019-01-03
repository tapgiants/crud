import React from 'react';
import ListContext from './ListContext';

const ListBody = ({ renderItem }) => (
  <ListContext.Consumer>
    {({ list }) => (
      <tbody>
        {list.map((item) => renderItem(item))}
      </tbody>
    )}
  </ListContext.Consumer>
);

export default ListBody;
