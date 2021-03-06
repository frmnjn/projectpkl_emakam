import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigationAdminPusat from '../../AdminPusat_nav';
import navigationAdminTPU from '../../AdminTPU_nav';
import navigationAdminKecamatan from '../../AdminKecamatan_nav';
import navigationkupt from '../../KepalaUPT_nav';
import navigationPengguna from '../../Pengguna_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

class DefaultLayout extends Component {
  render() {
    const Pusat = "Admin Pusat";
    const TPU = "Admin TPU";
    const Pengguna = "Pengguna";
    console.log(sessionStorage.getItem('login_session'));
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={
              sessionStorage.getItem('login_session') == "0" ? navigationAdminPusat:
              sessionStorage.getItem('login_session') == "1" ? navigationAdminTPU:
              sessionStorage.getItem('login_session') == "2" ? navigationkupt:
              sessionStorage.getItem('login_session') == "3" ? navigationkupt:
              sessionStorage.getItem('login_session') == "4" ? navigationkupt:
              sessionStorage.getItem('login_session') == "5" ? navigationAdminKecamatan:
              navigationPengguna} 
                 {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes}/> */}
            <Container fluid>
            <br></br>
            <h3>Welcome, {sessionStorage.getItem('username')}</h3>
            {
              sessionStorage.getItem('login_session') == "0" ?
              <small class="text-muted">your role : Admin Pusat</small>:
              sessionStorage.getItem('login_session') == "1" ?
              <small class="text-muted">your role : Admin TPU</small>:
              sessionStorage.getItem('login_session') == "2" ?
              <small class="text-muted">your role : Kepala UPT</small>:
              sessionStorage.getItem('login_session') == "3" ?
              <small class="text-muted">your role : Kepala Dinas</small>:
              sessionStorage.getItem('login_session') == "4" ?
              <small class="text-muted">your role : Kepala Kecamatan</small>:
              sessionStorage.getItem('login_session') == "5" ?
              <small class="text-muted">your role : Admin Kecamatan</small>:
              <small class="text-muted">your role : Guest</small>

            }


              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  }
                )}
                <Redirect from="/" to="/login" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
