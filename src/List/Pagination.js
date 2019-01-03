import React from 'react';

const Pagination = ({
  route,
  params = {},
  pageInfo: { startCursor, endCursor, hasPreviousPage, hasNextPage },
  totalCount,
  LinkComponent }) => (
    <div className="pagination">
      {hasPreviousPage &&
        <LinkComponent route={route} params={{ ...params, before: startCursor }}>
          <a className="btn-secondary" rel="previous_page">← Previous</a>
        </LinkComponent>
      }

      {hasNextPage &&
        <LinkComponent route={route} params={{ ...params, after: endCursor }}>
          <a className="btn-secondary" rel="next">Next →</a>
        </LinkComponent>
      }

      <span className="current">Total: {totalCount}</span>
    </div>
  );

export default Pagination;
