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
      name: 'Manajemen TPU',
      url: '/ManajemenTpu',
      icon: 'icon-user',
    },
    {
      name: 'Manajemen Blok Makam',
      url: '/ManajemenBlokMakam',
      icon: 'icon-user',
    },
    {
      name: 'Manajemen Makam',
      url: '/ManajemenMakam',
      icon: 'icon-user',
    },
    {
      name: 'Manajemen Penghuni Makam',
      url: '/ManajemenPenghuniMakam',
      icon: 'icon-user',
    },
    {
      name: 'Cari Data',
      url: '/Search',
      icon: 'icon-user',
    },
    
    // {
    //   name: 'Manajemen Hak Akses',
    //   url: '/ManajemenHakAkses',
    //   icon: 'icon-pencil',
    // },
  ],
};
