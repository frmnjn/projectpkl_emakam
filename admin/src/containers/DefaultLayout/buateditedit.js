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
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

class DefaultLayout extends Component {
  render() {
    const Pusat = "Pusat";
    const TPU = "TPU";
    console.log(sessionStorage.getItem('login_session'));
    if(sessionStorage.getItem('login_session') == "0"){
        return (
            <div className="app">
              <AppHeader fixed>
                <DefaultHeader />
              </AppHeader>
              <div className="app-body">
                <AppSidebar fixed display="lg">
                  <AppSidebarHeader />
                  <AppSidebarForm />
                  <AppSidebarNav navConfig={navigationAdminPusat} {...this.props} />
                  <AppSidebarFooter />
                  <AppSidebarMinimizer />
                </AppSidebar>
                <main className="main">
                  <AppBreadcrumb appRoutes={routes}/>
                  <Container fluid>
                  <h1>Welcome, Admin Pusat</h1>
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
    } else {
        return (
            <div className="app">
              <AppHeader fixed>
                <DefaultHeader />
              </AppHeader>
              <div className="app-body">
                <AppSidebar fixed display="lg">
                  <AppSidebarHeader />
                  <AppSidebarForm />
                  <AppSidebarNav navConfig={navigationAdminTPU} {...this.props} />
                  <AppSidebarFooter />
                  <AppSidebarMinimizer />
                </AppSidebar>
                <main className="main">
                  <AppBreadcrumb appRoutes={routes}/>
                  <Container fluid>
                  <h1>Welcome, Admin TPU</h1>
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
}

export default DefaultLayout;
