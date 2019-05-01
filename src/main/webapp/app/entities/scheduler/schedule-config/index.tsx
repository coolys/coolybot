import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ScheduleConfig from './schedule-config';
import ScheduleConfigDetail from './schedule-config-detail';
import ScheduleConfigUpdate from './schedule-config-update';
import ScheduleConfigDeleteDialog from './schedule-config-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ScheduleConfigUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ScheduleConfigUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ScheduleConfigDetail} />
      <ErrorBoundaryRoute path={match.url} component={ScheduleConfig} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ScheduleConfigDeleteDialog} />
  </>
);

export default Routes;
