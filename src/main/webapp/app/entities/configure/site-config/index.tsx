import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SiteConfig from './site-config';
import SiteConfigDetail from './site-config-detail';
import SiteConfigUpdate from './site-config-update';
import SiteConfigDeleteDialog from './site-config-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SiteConfigUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SiteConfigUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SiteConfigDetail} />
      <ErrorBoundaryRoute path={match.url} component={SiteConfig} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SiteConfigDeleteDialog} />
  </>
);

export default Routes;
