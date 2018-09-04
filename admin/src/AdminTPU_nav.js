export default {
  items: [
    {
      title: true,
      name: 'Menu',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Registrasi Perijinan',
      url: '/RegistrasiPerijinanMakam',
      icon: 'icon-chart',
    },
    {
      name: 'Dokumen',
      url: '/Dokumen',
      icon: 'icon-chart',
    },
    {
      name: 'M. Blok Makam',
      url: '/ManajemenBlokMakam',
      icon: 'icon-chart',
    },
    {
      name: 'Manajemen Makam',
      url: '/ManajemenMakam',
      icon: 'icon-chart',
    },
    {
      name: 'M. Penghuni Makam',
      url: '/ManajemenPenghuniMakam',
      icon: 'icon-chart',
    },
    {
      name: 'Cari Data',
      url: '/Search',
      icon: 'icon-magnifier',
    },
    
    // {
    //   name: 'Manajemen Hak Akses',
    //   url: '/ManajemenHakAkses',
    //   icon: 'icon-pencil',
    // },
  ],
};
