import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/site-config">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Site Config
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/schedule-config">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Schedule Config
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/fetch">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Fetch
    </DropdownItem>
  </NavDropdown>
);
