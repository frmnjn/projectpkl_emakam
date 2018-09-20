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
      name: 'Dokumen',
      url: '/Dokumen',
      icon: 'icon-magnifier',
    },
    {
      name: 'Manajemen TPU',
      url: '/ManajemenTpu',
      icon: 'icon-chart',
    },
    {
      name: 'Manajemen Pengguna',
      url: '/ManajemenPengguna',
      icon: 'icon-user',
    },
    {
      name: 'Manajemen Hak Akses',
      url: '/ManajemenHakAkses',
      icon: 'icon-pencil',
    },
    {
      name: 'M. Akses Kecamatan',
      url: '/ManajemenHakAksesKec',
      icon: 'icon-pencil',
    },
    {
      name: 'Cari Data',
      url: '/Search',
      icon: 'icon-magnifier',
    },
  ],
};
