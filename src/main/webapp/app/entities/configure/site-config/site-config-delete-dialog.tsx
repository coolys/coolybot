import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-coolybot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISiteConfig } from 'app/shared/model/configure/site-config.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './site-config.reducer';

export interface ISiteConfigDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SiteConfigDeleteDialog extends React.Component<ISiteConfigDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.siteConfigEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { siteConfigEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody id="gatewayApp.configureSiteConfig.delete.question">Are you sure you want to delete this SiteConfig?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp; Cancel
          </Button>
          <Button id="clb-confirm-delete-siteConfig" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp; Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ siteConfig }: IRootState) => ({
  siteConfigEntity: siteConfig.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteConfigDeleteDialog);
