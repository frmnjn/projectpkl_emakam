import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';
import { Login, Page404, Page500 } from './views/Pages';

function Loading() {
  return <div>Loading...</div>;
}

const Users = Loadable({
  loader: () => import('./views/Users/Users'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./views/Users/User'),
  loading: Loading,
});

const ManajemenPengguna = Loadable({
  loader: () => import('./views/AdminPusat/ManajemenPengguna/ManajemenPengguna'),
  loading: Loading,
});

const Home = Loadable({
  loader: () => import('./views/Home'),
  loading: Loading,
});

const Supplier = Loadable({
  loader: () => import('./views/Supplier'),
  loading: Loading,
});

const Buyer = Loadable({
  loader: () => import('./views/Buyer'),
  loading: Loading,
});

const Log = Loadable({
  loader: () => import('./views/Log'),
  loading: Loading,
});




// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/login', name: 'Home', component: Login },
  { path: '/ManajemenPengguna', name: 'Manajemen Pengguna', component: ManajemenPengguna },
  { path: '/supplier', name: 'Supplier', component: Supplier },
  { path: '/buyer', name: 'Buyer', component: Buyer },
  { path: '/log', name: 'Log', component: Log },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
