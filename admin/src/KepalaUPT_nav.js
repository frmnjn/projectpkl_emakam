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
      icon: 'icon-chart',
    }, 
    {
      name: sessionStorage.getItem ('login_session') == 5? 'Download Dokumen':'Data Dokumen',
      url: '/CetakDokumen',
      icon: 'icon-chart',
    },
    {
      name: 'Peta Makam',
      url: '/ViewMapAdmin',
      icon: 'icon-map',
    },
    // {
    //   name: 'Manajemen Hak Akses',
    //   url: '/ManajemenHakAkses',
    //   icon: 'icon-pencil',
    // },
  ],
};
