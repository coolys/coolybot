import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Fetch from './fetch';
import FetchDetail from './fetch-detail';
import FetchUpdate from './fetch-update';
import FetchDeleteDialog from './fetch-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FetchUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FetchUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FetchDetail} />
      <ErrorBoundaryRoute path={match.url} component={Fetch} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FetchDeleteDialog} />
  </>
);

export default Routes;
