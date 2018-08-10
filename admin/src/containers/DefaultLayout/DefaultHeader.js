import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/filkom.svg'
import sygnet from '../../assets/img/brand/filkom.svg'
import usersData from '../../views/Users/UsersData';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  logout() {
    sessionStorage.clear();
    // <Switch>
    // <Redirect to="/" />
    // </Switch>
  }

  change_password() {
    <Redirect to="/ChangePassword" />
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>

          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/placeholder.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              {/* <DropdownItem href="#/users/1" ><i className="fa fa-user"></i> Profile</DropdownItem> */}
              {/* <DropdownItem onClick={() => this.logout()}><i className="fa fa-lock"></i> Logout</DropdownItem> */}
              <DropdownItem><i className="fa fa-lock"></i> <a href="#/ChangePassword" onClick={() => this.change_password()}>Change Password</a></DropdownItem>
              <DropdownItem><i className="fa fa-lock"></i> <a href="/" onClick={() => this.logout()}>Log Out</a></DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
