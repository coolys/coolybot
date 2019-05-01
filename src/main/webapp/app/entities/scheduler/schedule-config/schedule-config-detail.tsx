import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-coolybot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './schedule-config.reducer';
import { IScheduleConfig } from 'app/shared/model/scheduler/schedule-config.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IScheduleConfigDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ScheduleConfigDetail extends React.Component<IScheduleConfigDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { scheduleConfigEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ScheduleConfig [<b>{scheduleConfigEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{scheduleConfigEntity.name}</dd>
          </dl>
          <Button tag={Link} to="/entity/schedule-config" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/schedule-config/${scheduleConfigEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ scheduleConfig }: IRootState) => ({
  scheduleConfigEntity: scheduleConfig.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleConfigDetail);
