import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ScheduleConfig from './scheduler/schedule-config';
import Fetch from './fetcher/fetch';
import SiteConfig from './configure/site-config';
/* coolybot-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/site-config`} component={SiteConfig} />
      <ErrorBoundaryRoute path={`${match.url}/schedule-config`} component={ScheduleConfig} />
      <ErrorBoundaryRoute path={`${match.url}/fetch`} component={Fetch} />
      {/* coolybot-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
