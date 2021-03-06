import React, { Component } from 'react';
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
import ReactTable from "react-table";
import { RingLoader } from 'react-spinners';
import 'react-table/react-table.css'

class CetakDokumen extends Component {
  constructor(props) {
    super(props);

    this.cetak_dokumen = this.cetak_dokumen.bind(this);
    this.modalnosuratclose = this.modalnosuratclose.bind(this);
    this.get_tanggal_sekarang = this.get_tanggal_sekarang.bind(this);
    this.update_no_surat_perizinan = this.update_no_surat_perizinan.bind(this);
    this.fetchview = this.fetchview.bind(this);

    // this.get_active_row = this.get_active_row.bind(this);

    this.state = {
      radioSelected: 2,
      isLoaded: false,
      items: [],
      activenamapenghuni: null,
      activenamapewaris: null,
      activetanggal: null,
      activetanggal_sekarang: null,
      activenik_ahli_waris: null,
      activekontak_ahli_waris: null,

      activenosurat:[],

      no_surat:null
    };
  }

  componentDidMount() {
    this.fetchview()
  }

  fetchview(){
      fetch("http://149.28.138.217/api/dokumen/view_siap_cetak?token=" + sessionStorage.getItem('token')+'&id_user='+sessionStorage.getItem('id_user'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          console.log(json);
          
          this.setState({
            isLoaded: true,
            items: json,
          });
        },
    )
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  surat_permohonan = (items) =>{
    if(items.no_surat_permohonan!=null){
      const url = 'http://149.28.138.217/api/dokumen/cetak_dokumen_permohonan?token=' + sessionStorage.getItem('token')
      + '&tanggal_sekarang=' + items.tanggal_surat_permohonan
      + '&nama_ahli_waris=' + items.nama_pewaris
      + '&alamat_ahli_waris=' + items.alamat_ahli_waris
      + '&tanggal_wafat=' + items.tanggal_wafat
      + '&nama_almarhum=' + items.nama_almarhum
      + '&ttl_almarhum=' + items.tanggal_lahir_alm
      + '&ttl_ahli_waris=' + items.tgllhr_ahli_waris
      + '&jenis_kelamin_almarhum=' + items.jenis_kelamin
      + '&tpu_almarhum=' + items.nama_tpu
      + '&alamat_almarhum=' + items.alamat_terakhir
      + '&tanggal_pemakaman=' + items.tanggal_pemakaman
      + '&blok_almarhum=' + items.kode_blok
      + '&no_surat_permohonan=' + items.no_surat_permohonan
      window.location = url;
      this.modalnosuratclose
    }else{
      console.log(sessionStorage.getItem('login_session'))
      if(sessionStorage.getItem('login_session') == "4"){
        alert("Proses Dokumen Belum Selesai")
      }else{
        alert("nomor surat permohonan masih kosong!");
      }
    }
  }

  cetak_dokumen = (items) => {
    // event.preventDefault();
    if(items.no_surat_perizinan!=null){
      //alert(items.no_surat_perizinan)
      const url = 'http://149.28.138.217/api/dokumen/cetak_dokumen_perizinan?token=' + sessionStorage.getItem('token')
      +'&tanggal_sekarang='+items.tanggal_surat_perizinin          
      +'&nama_ahli_waris='+items.nama_pewaris
      +'&alamat_ahli_waris='+items.alamat_ahli_waris
      +'&nama_almarhum='+items.nama_almarhum
      +'&ttl_almarhum='+items.tanggal_lahir_alm
      +'&jenis_kelamin_almarhum='+items.jenis_kelamin
      +'&tpu_almarhum='+items.nama_tpu
      +'&tanggal_pemakaman='+items.tanggal_pemakaman
      +'&blok_almarhum='+items.kode_blok
      +'&no_surat_perizinan='+items.no_surat_perizinan
      +'&no_surat_permohonan='+items.no_surat_permohonan
      +'&tanggal_surat_permohonan='+items.tanggal_surat_permohonan
      +'&id_kecamatan='+items.id_kecamatan

      window.location = url;
    }else{
      if(sessionStorage.getItem('login_session') == "4"){
        alert("Proses Dokumen Belum Selesai")
      }else{
        alert("nomor surat perizinan masih kosong!");
      }
    }
  }

  update_no_surat_perizinan(id) {
    fetch('http://149.28.138.217/api/dokumen/update?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        status: 'Proses Selesai',
        no_surat_perizinan: this.state.no_surat,
        tanggal_surat_perizinin: this.get_tanggal_sekarang()
      })
    }).then((response) => response.json())
      .then((responsejson) => {
        alert('Nomor Surat telah tersimpan');
      })
      .then(
        this.fetchview
      ).then(
        this.modalnosuratclose
      ).catch((err)=>{
        this.setState({
          isLoaded: false
        })
        alert("Permintaan tidak dapat diproses")
      })
  }

  nosuratmodal(items) {
    this.setState({
      activenosurat: items,
      nosuratmodal: !this.state.nosuratmodal,
    })
  }

  modalnosuratclose() {
    this.setState({
      nosuratmodal: !this.state.nosuratmodal,
    });
  }


  render() {
    // console.log(this.state.items);
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
        <Modal isOpen={this.state.nosuratmodal} toggle={this.modalnosuratclose} className={'modal-Large ' + this.props.className}>
            <ModalHeader toggle={this.modalnosuratclose}>No Surat</ModalHeader>
            <ModalBody>
              <form className="form-group" onSubmit=''>
                <div class="form-group">
                <label>No Surat</label>
                <input type="text" className="form-control" onChange={this.handleChange} name="no_surat"></input><br/>
                <Button onClick={()=>this.update_no_surat_perizinan(this.state.activenosurat.id)}>Simpan</Button>
                </div>
              </form>
            </ModalBody>
          </Modal>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  Cetak Dokumen
              </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.items}
                    resolveData={data => data.map(row => row)}
                    filterable
                    defaultPageSize={10}
                    columns={[
                      { accessor: 'id', show: false },
                      { accessor: 'id_kecamatan', show: false },
                      { accessor: 'nama_almarhum', show: false },
                      { accessor: 'no_surat_perizinan', show: false },
                      { accessor: 'tanggal_surat_permohonan', show: false },
                      { accessor: 'tanggal_surat_perizinin', show: false },
                      { accessor: 'no_surat_permohonan', show: false },
                      { accessor: 'nik_ahli_waris', show: false },
                      { accessor: 'alamat_ahli_waris', show: false },
                      { accessor: 'tanggal_wafat', show: false },
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
                        Header: 'Nomor Surat Izin',
                        accessor: 'no_surat_perizinan', // String-based value accessors!
                      },
                      {
                        Header: 'Nomor Surat Permohonan',
                        accessor: 'no_surat_permohonan', // String-based value accessors!
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
                        Header: 'Tanggal Wafat',
                        accessor: 'tanggal_wafat', // String-based value accessors!
                      },
                      {
                        Header: 'Kelengkapan Dokumen',
                        accessor: 'kelengkapan_dokumen', // String-based value accessors!
                        show: false
                      },
                      {
                        Header: 'Action',
                        filterable:false,
                        show: sessionStorage.getItem('login_session')==5?true:false,
                        // accessor: 'status', // String-based value accessors!
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.nosuratmodal(row.row)} className="mr-1">Atur</Button>
                          </div>
                        )
                      },
                      {
                        Header: 'Unduh Surat Permohonan',
                        filterable:false,
                        // accessor: 'status', // String-based value accessors!
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.surat_permohonan(row.row)} className="mr-1">Unduh Dokumen</Button>
                          </div>
                        )
                      },
                      {
                        Header: 'Unduh Surat Izin',
                        filterable:false,
                        // accessor: 'status', // String-based value accessors!
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.cetak_dokumen(row.row)} className="mr-1">Unduh Dokumen</Button>
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

export default CetakDokumen;
