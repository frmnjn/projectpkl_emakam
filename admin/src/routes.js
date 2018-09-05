import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';
import { Login, Page404, Page500 } from './views/Pages';
import { AuthorizedComponent } from 'react-router-role-authorization';

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

const ManajemenHakAkses = Loadable({
  loader: () => import('./views/AdminPusat/ManajemenHakAkses/ManajemenHakAkses'),
  loading: Loading,
});

const Search = Loadable({
  loader: () => import('./views/Pengguna/Search/Search'),
  loading: Loading,
});

const ManajemenPenghuniMakam = Loadable({
  loader: () => import('./views/AdminTPU/ManajemenDataPenghuniMakam/ManajemenDataPenghuniMakam'),
  loading: Loading,
});

const ManajemenMakam = Loadable({
  loader: () => import('./views/AdminTPU/ManajemenMakam/Makam'),
  loading: Loading,
});

const ManajemenBlokMakam = Loadable({
  loader: () => import('./views/AdminTPU/ManajemenBlokMakam/BlokMakam'),
  loading: Loading,
});

const ManajemenTPU = Loadable({
  loader: () => import('./views/AdminPusat/ManajemenTPU/tpu'),
  loading: Loading,
});

const ChangePassword = Loadable({
  loader: () => import('./views/Pengguna/ChangePassword/ChangePassword'),
  loading: Loading,
});

const RegistrasiPerijinanMakam = Loadable({
  loader: () => import('./views/AdminTPU/RegistrasiPerijinanMakam/RegistrasiPerijinanMakam'),
  loading: Loading,
});

const Dokumen = Loadable({
  loader: () => import('./views/KepalaTPU/Dokumen/Dokumen'),
  loading: Loading,
});

const CetakDokumen = Loadable({
  loader: () => import('./views/AdminKecamatan/CetakDokumen/CetakDokumen'),
  loading: Loading,
});



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/Dokumen', exact: true, name: 'Dokumen', component: Dokumen  },
  { path: '/CetakDokumen', exact: true, name: 'Dokumen', component: CetakDokumen  },
  { path: '/ChangePassword', exact: true, name: 'Change Password', component: ChangePassword  },
  { path: '/Search', exact: true, name: 'Search', component: Search  },
  { path: '/ManajemenPenghuniMakam', exact: true, name: 'Penghuni Makam', component: ManajemenPenghuniMakam  },
  { path: '/ManajemenMakam', exact: true, name: 'Manajemen Makam', component: ManajemenMakam  },
  { path: '/ManajemenBlokMakam', exact: true, name: 'Manajemen Makam', component: ManajemenBlokMakam  },
  { path: '/ManajemenTpu', exact: true, name: 'Manajemen TPU', component: ManajemenTPU  },
  { path: '/RegistrasiPerijinanMakam', exact: true, name: 'Registrasi Perijinan Makam', component: RegistrasiPerijinanMakam  },
  { path: '/login', name: 'Home', component: Login },
  { path: '/ManajemenPengguna', name: 'Manajemen Pengguna', component: ManajemenPengguna },
  { path: '/ManajemenHakAkses', name: 'Manajemen Hak Akses', component: ManajemenHakAkses },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
