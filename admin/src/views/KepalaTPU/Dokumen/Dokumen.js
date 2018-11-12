import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import ReactTable from "react-table";
import { RingLoader } from 'react-spinners';

import 'react-table/react-table.css'

class Search extends Component {
  constructor(props) {
    super(props);



    this.toggle = this.toggle.bind(this);
    this.toggleclose = this.toggleclose.bind(this);
    this.modalkkclose = this.modalkkclose.bind(this);
    this.modalktpclose = this.modalktpclose.bind(this);
    this.modalsuratclose = this.modalsuratclose.bind(this);
    this.modalnosuratclose = this.modalnosuratclose.bind(this);
    this.modalskclose = this.modalskclose.bind(this);
    this.modalsklamaclose = this.modalsklamaclose.bind(this);


    this.toggleproggress = this.toggleproggress.bind(this);

    this.fetchdata = this.fetchdata.bind(this);

    this.update_status = this.update_status.bind(this);
    this.acc_kec = this.acc_kec.bind(this);
    this.acc_dinas = this.acc_dinas.bind(this);
    this.acc_kupt = this.acc_kupt.bind(this);
    this.cek_kelengkapan = this.cek_kelengkapan.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      error: null,
      isLoaded: false,
      isSend: false,
      isFiltered: true,
      filter_keyword: '',
      items: [],
      showitems: [],
      itemsperblok: [],
      blok: [],
      details_almarhum: [],
      blokfilter: false,
      itemblokfilter: [],
      activename: null,
      activeqty: null,
      activesupplier: null,
      formqty: '1',

      activedata: [],
      activektp: null,
      activekk: null,
      activenosurat: [],

      no_surat: null
    };

    this.fetchdata();
  }

  get_tanggal_sekarang() {
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    // var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    // var thisDay = date.getDay(),
    //   thisDay = myDays[thisDay];
    var yy = date.getYear();
    var year = (yy < 1000) ? yy + 1900 : yy;
    return (day + ' ' + months[month] + ' ' + year);
  }

  update_status(id, newstatus) {
    fetch('http://api.emakam.tujuhlangit.id/api/dokumen/update?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        status: newstatus
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        alert('Permintaan telah berhasil diproses');
      }).then(
        this.fetchdata
      )
  }

  update_status_acc_dinas(id, newstatus) {
    fetch('http://api.emakam.tujuhlangit.id/api/dokumen/update?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        status: newstatus,
        no_surat_permohonan: this.state.no_surat,
        tanggal_surat_permohonan: this.get_tanggal_sekarang()
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        alert('Permohonan izin berhasil diproses');
      }).then(
        this.fetchdata
      )
  }

  acc_kec(row) {
    alert('sistem sedang memproses data dan mencoba mengirim email. tunggu sebentar...')
    var status = 'Proses Selesai'
    fetch('http://api.emakam.tujuhlangit.id/api/send?to=' + row.email + '&message=Permohonan izin penggunaan lahan makam anda telah diproses silahkan ke ambil pada kecamatan').then(this.setState({
      isSend: true
    })).then(console.log("sending"))  

    // if (this.state.isSend) {
    //   alert("Notification Sent")
    // }
     
    this.update_status(row.id, status)
  }

  acc_dinas = event => {
    event.preventDefault();
    var status = 'Menunggu Persetujuan Kepala Kecamatan'
    const url = 'http://api.emakam.tujuhlangit.id/api/dokumen/cetak_surat_permohonan?token=' + sessionStorage.getItem('token')
      + '&tanggal_sekarang=' + this.get_tanggal_sekarang()
      + '&nama_ahli_waris=' + this.state.activenosurat.nama_pewaris
      + '&alamat_ahli_waris=' + this.state.activenosurat.alamat_ahli_waris
      + '&tanggal_wafat=' + this.state.activenosurat.tanggal_wafat
      + '&nama_almarhum=' + this.state.activenosurat.nama_almarhum
      + '&ttl_almarhum=' + this.state.activenosurat.tanggal_lahir_alm
      + '&ttl_ahli_waris=' + this.state.activenosurat.tgllhr_ahli_waris
      + '&jenis_kelamin_almarhum=' + this.state.activenosurat.jenis_kelamin
      + '&tpu_almarhum=' + this.state.activenosurat.nama_tpu
      + '&alamat_almarhum=' + this.state.activenosurat.alamat_terakhir
      + '&tanggal_pemakaman=' + this.state.activenosurat.tanggal_pemakaman
      + '&blok_almarhum=' + this.state.activenosurat.kode_blok
      + '&no_surat_permohonan=' + this.state.no_surat

    window.location = url
    this.update_status_acc_dinas(this.state.activenosurat.id, status)

    this.modalnosuratclose()
  }

  acc_kupt(id) {
    var status = 'Menunggu Persetujuan Kepala Dinas'
    this.update_status(id, status)
  }

  cek_kelengkapan(id) {
    fetch('http://api.emakam.tujuhlangit.id/api/dokumen/update?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        kelengkapan_dokumen: 'Lengkap'
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        alert('Update Sukses');
      })
  }

  componentDidMount() {


  }

  fetchdata() {
    fetch("http://api.emakam.tujuhlangit.id/api/dokumen/view?token=" + sessionStorage.getItem('token') + '&id_user=' + sessionStorage.getItem('id_user') + '&role=' + sessionStorage.getItem('login_session'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {

          if (sessionStorage.getItem('login_session') == "2") {
            var updateitem;
            updateitem = json;
            updateitem = updateitem.filter(function (item) {
              return item.kelengkapan_dokumen.toLowerCase().search("lengkap") !== -1 &&
                item.status.toLowerCase().search("menunggu persetujuan kepala upt") !== -1;
            });
            this.setState({ showitems: updateitem });
          } else if (sessionStorage.getItem('login_session') == "3") {
            var updateitem;
            updateitem = json;
            updateitem = updateitem.filter(function (item) {
              return item.kelengkapan_dokumen.toLowerCase().search("lengkap") !== -1 &&
                item.status.toLowerCase().search("menunggu persetujuan kepala dinas") !== -1;
            });
            this.setState({ showitems: updateitem });
          } else if (sessionStorage.getItem('login_session') == "4") {
            var updateitem;
            updateitem = json;
            updateitem = updateitem.filter(function (item) {
              return item.kelengkapan_dokumen.toLowerCase().search("lengkap") !== -1 &&
                item.status.toLowerCase().search("menunggu persetujuan kepala kecamatan") !== -1;
            });
            this.setState({ showitems: updateitem });
          } else {
            this.setState({ showitems: json });
          }

          this.setState({
            isLoaded: true,
            items: json,
          });
        },
    )
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  checksuratpermohonan(items){
    if(items.no_surat_permohonan!=null){
      return items.no_surat_permohonan
    }else{
      return "-"
    }
  }

  checksuratizin(items){
    if(items.no_surat_perizinan!=null){
      return items.no_surat_perizinan
    }else{
      return "-"
    }
  }

  checksklama(items){
    if(items.file_sk_lama!="-"){
      return (
        <Button id='buttonsk' color="info"  onClick={() => this.modalsklama(items)} className="mr-1"><i className="icon-note icons text-left"></i></Button>
      )
    }else{
      return (
        <Button id='buttonsk' color="info" disabled onClick={() => this.modalsklama(items)} className="mr-1"><i className="icon-note icons text-left"></i></Button>
      )
    }
      
  }

  toggle(items) {
    this.setState({
      activedata: items,
      modal: !this.state.modal,
    });
  }

  modalkk(items) {
    this.setState({
      activekk: items.file_kk.substring(6),
      kkmodal: !this.state.kkmodal,
    })
  }

  modalsk(items) {
    this.setState({
      activesk: items.file_sk.substring(6),
      skmodal: !this.state.skmodal,
    })
  }

  modalsklama(items) {
    this.setState({
      activesklama: items.file_sk_lama.substring(6),
      sklamamodal: !this.state.sklamamodal,
    })
  }

  nosuratmodal(items) {
    this.setState({
      activenosurat: items,
      nosuratmodal: !this.state.nosuratmodal,
    })
  }

  modalktp(items) {
    this.setState({
      activektp: items.file_ktp.substring(6),
      ktpmodal: !this.state.ktpmodal,
    })
  }

  modalsurat(items) {
    this.setState({
      activesurat: items.file_surat_izin.substring(6),
      suratmodal: !this.state.suratmodal,
    });
  }

  modalkkclose() {
    this.setState({
      kkmodal: !this.state.kkmodal,
    });
  }

  modalnosuratclose() {
    this.setState({
      nosuratmodal: !this.state.nosuratmodal,
    });
  }

  modalktpclose() {
    this.setState({
      ktpmodal: !this.state.ktpmodal,
    });
  }
  modalsuratclose() {
    this.setState({
      suratmodal: !this.state.suratmodal,
    });
  }

  modalskclose() {
    this.setState({
      skmodal: !this.state.skmodal,
    })
  }

  modalsklamaclose() {
    this.setState({
      sklamamodal: !this.state.sklamamodal,
    })
  }


  toggleclose() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleproggress() {
    this.setState({
      modalprogress: !this.state.modalprogress,
    });
  }


  render() {
    console.log(this.state.showitems);
    // const {isLoaded, items} = this.state;
    if (!this.state.isLoaded) {
      return (<div style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
        <div className='sweet-loading'>
          <RingLoader
            color={'#123abc'}
          />
        </div>
      </div>)
    } else {
      return (
        <div className="animated fadeIn">
          <Modal isOpen={this.state.modal} toggle={this.toggleclose} className={'modal-Large ' + this.props.className}>
            <ModalHeader toggle={this.toggleclose}>Lihat Data Penghuni Makam</ModalHeader>
            <ModalBody>
              <form className="form-group" onSubmit=''>
                <label>Nama Penghuni Makam</label>
                <input type="text" className="form-control" name="activenama" value={this.state.activedata.nama} disabled></input>
                <label>Alamat Terakhir</label>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={this.state.nosuratmodal} toggle={this.modalnosuratclose} className={'modal-Large ' + this.props.className}>
            <ModalHeader toggle={this.modalnosuratclose}>No Surat</ModalHeader>
            <ModalBody>
              <form className="form-group" onSubmit={this.acc_dinas}>
                <div class="form-group">
                  <label>No Surat</label>
                  <input type="text" className="form-control" onChange={this.handleChange} name="no_surat"></input>
                </div>
                <input type="submit" className="form-control btn btn-primary" Value="Submit"></input>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={this.state.ktpmodal} toggle={this.modalktpclose} className={'modal-Large ' + this.props.className}>
            <ModalHeader toggle={this.modalktpclose}>Kartu Tanda Penduduk</ModalHeader>
            <ModalBody>
              <img src={"http://api.emakam.tujuhlangit.id/storage" + this.state.activektp} class="img-fluid" alt="Responsive image"></img>
            </ModalBody>
          </Modal>
          <Modal isOpen={this.state.kkmodal} toggle={this.modalkkclose} className={'modal-Large ' + this.props.className}>
            <ModalHeader toggle={this.modalkkclose}>Kartu Keluarga</ModalHeader>
            <ModalBody>
              <img src={"http://api.emakam.tujuhlangit.id/storage" + this.state.activekk} class="img-fluid" alt="Responsive image"></img>
            </ModalBody>
          </Modal>
          <Modal isOpen={this.state.suratmodal} toggle={this.modalsuratclose} className={'modal-Large ' + this.props.className}>
            <ModalHeader toggle={this.modalsuratclose}>Surat Permohonan</ModalHeader>
            <ModalBody>
              <img src={"http://api.emakam.tujuhlangit.id/storage" + this.state.activesurat} class="img-fluid" alt="Responsive image"></img>
            </ModalBody>
          </Modal>
          <Modal isOpen={this.state.skmodal} toggle={this.modalskclose} className={'modal-Large ' + this.props.className}>
            <ModalHeader toggle={this.modalskclose}>Surat Kematian</ModalHeader>
            <ModalBody>
              <img src={"http://api.emakam.tujuhlangit.id/storage" + this.state.activesk} class="img-fluid" alt="Responsive image"></img>
            </ModalBody>
          </Modal>
          <Modal isOpen={this.state.sklamamodal} toggle={this.modalsklamaclose} className={'modal-Large ' + this.props.className}>
            <ModalHeader toggle={this.modalsklamaclose}>Surat Izin Lama</ModalHeader>
            <ModalBody>
              <img src={"http://api.emakam.tujuhlangit.id/storage" + this.state.activesklama} class="img-fluid" alt="Responsive image"></img>
            </ModalBody>
          </Modal>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  Manajemen Dokumen
              </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.showitems}
                    resolveData={data => data.map(row => row)}
                    defaultPageSize={10}
                    filterable
                    columns={[
                      { accessor: 'id', show: false },
                      { accessor: 'nama_almarhum', show: false },
                      { accessor: 'nik_ahli_waris', show: false },
                      { accessor: 'alamat_ahli_waris', show: false },
                      { accessor: 'tanggal_wafat', show: false },
                      { accessor: 'id_penghuni_makam', show: false },
                      { accessor: 'tanggal_lahir_alm', show: false },
                      { accessor: 'tanggal_pemakaman', show: false },
                      { accessor: 'tgllhr_ahli_waris', show: false },
                      { accessor: 'jenis_kelamin', show: false },
                      { accessor: 'nama_tpu', show: false },
                      { accessor: 'alamat_terakhir', show: false },
                      { accessor: 'kode_blok', show: false },
                      {
                        Header: 'Kode Registrasi',
                        accessor: 'kode_registrasi', // String-based value accessors!
                      },
                      {
                        Header: 'Nama Almarhum',
                        accessor: 'nama_almarhum', // String-based value accessors!
                      },
                      {
                        Header: 'Nama Pewaris',
                        accessor: 'nama_pewaris', // String-based value accessors!
                      },
                      {
                        Header: 'Actions',
                        accessor: 'status', // String-based value accessors!
                        show: sessionStorage.getItem('login_session') == "2" ? true : false,
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.acc_kupt(row.row.id)} className="mr-1">Rekomendasi</Button>
                          </div>
                        )
                      },
                      {
                        Header: 'Email Pewaris',
                        show:false,
                        accessor: 'email', // String-based value accessors!
                      },
                      {
                        Header: 'Nomor Surat Izin',
                        accessor: 'no_surat_perizinan', // String-based value accessors!
                        Cell: row => (
                          <div>
                            {this.checksuratizin(row.row)}
                          </div>
                        )
                      },
                      {
                        Header: 'Nomor Surat Permohonan',
                        accessor: 'no_surat_permohonan', // String-based value accessors!
                        Cell: row => (
                          <div>
                            {this.checksuratpermohonan(row.row)}
                          </div>
                        )
                      },
                      {
                        filterable: false,
                        Header: 'KTP Almarhum',
                        show:false,
                        accessor: 'file_ktp', // String-based value accessors!
                        Cell: row => (
                          <div>
                          </div>
                        )
                      },
                      {
                        Header: 'KK Almarhum',
                        filterable: false,
                        show:false,
                        accessor: 'file_kk', // String-based value accessors!
                        Cell: row => (
                          <div>
                          </div>
                        )
                      },
                      {
                        Header: 'Kelengkapan Dokumen',
                        filterable: false,
                        width:200,
                        accessor: 'file_sk', // String-based value accessors!
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.modalktp(row.row)} className="mr-1"><i className="icon-credit-card text-left"></i></Button>
                            <Button color="info" onClick={() => this.modalkk(row.row)} className="mr-1"><i className="icon-map icons text-left"></i></Button>
                            <Button color="info" onClick={() => this.modalsk(row.row)} className="mr-1"><i className="icon-layers icons text-left"></i></Button>
                            {this.checksklama(row.row)}
                          </div>
                        )
                      },
                      {
                        Header: 'SK Lama Almarhum',
                        filterable: false,
                        show:false,
                        accessor: 'file_sk_lama', // String-based value accessors!
                        Cell: row => (
                          <div>
                          </div>
                        )
                      },
                      {
                        Header: 'Surat Permohonan',
                        show:false,
                        filterable: false,
                        accessor: 'file_surat_izin', // String-based value accessors!
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.modalsurat(row.row)} className="mr-1"><i className="icon-magnifier icons text-left"></i></Button>
                          </div>
                        )
                      },
                      {
                        Header: 'Kelengkapan Dokumen',
                        accessor: 'kelengkapan_dokumen',
                        show: false, // String-based value accessors!
                      },
                      {
                        Header: 'Status',
                        accessor: 'status', // String-based value accessors!
                      },
                      {
                        Header: 'Actions',
                        filterable: false,
                        accessor: 'status', // String-based value accessors!
                        show: sessionStorage.getItem('login_session') == "4" ? true : false,
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.acc_kec(row.row)} className="mr-1">Accept</Button>
                          </div>
                        )
                      },
                      {
                        Header: 'Actions',
                        filterable: false,
                        accessor: 'status', // String-based value accessors!
                        show: sessionStorage.getItem('login_session') == "3" ? true : false,
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.nosuratmodal(row.row)} className="mr-1">Keluarkan Surat Permohonan</Button>
                          </div>
                        )
                      },
                      {
                        Header: 'Actions',
                        filterable: false,
                        show: false,
                        // sessionStorage.getItem('login_session') == "1" ? true : false,
                        accessor: 'status', // String-based value accessors!
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.cek_kelengkapan(row.row.id)} className="mr-1">Accept</Button>
                          </div>
                        )
                      },
                    ]}
                  />
                  <hr></hr>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Search;
