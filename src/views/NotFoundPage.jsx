import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';

const NotFoundPage = () => {
  return (
    <div>
      This link is broken or the page has been moved. Try{' '}
      <Link to={routes.home}>this page</Link> instead
    </div>
  );
};

export default NotFoundPage;
