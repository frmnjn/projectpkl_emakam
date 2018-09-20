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
    fetch("http://localhost:8000/api/dokumen/view_siap_cetak?token=" + sessionStorage.getItem('token')+'&id_user='+sessionStorage.getItem('id_user'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            items: json,
          });
        },
    )
  }

  update_no_surat_perizinan(id) {
    fetch('http://localhost:8000/api/dokumen/update?token=' + sessionStorage.getItem('token'), {
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
      .then((responseJson) => {
        //alert('Update Success');
      })
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

  nomor_surat = event => {
    event.preventDefault();
    this.update_no_surat_perizinan(this.state.activenosurat.id);
<<<<<<< HEAD
=======
    const url = 'http://localhost:8000/api/dokumen/cetak_surat_perizinan?token=' + sessionStorage.getItem('token')
    +'&tanggal_sekarang='+this.get_tanggal_sekarang()            
    +'&nama_ahli_waris='+this.state.activenosurat.nama_pewaris
    +'&alamat_ahli_waris='+this.state.activenosurat.alamat_ahli_waris
    +'&nama_almarhum='+this.state.activenosurat.nama_almarhum
    +'&ttl_almarhum='+this.state.activenosurat.tanggal_lahir_alm
    +'&jenis_kelamin_almarhum='+this.state.activenosurat.jenis_kelamin
    +'&tpu_almarhum='+this.state.activenosurat.nama_tpu
    +'&tanggal_pemakaman='+this.state.activenosurat.tanggal_pemakaman
    +'&blok_almarhum='+this.state.activenosurat.kode_blok
    +'&no_surat_perizinan='+this.state.no_surat
    +'&no_surat_permohonan='+this.state.activenosurat.no_surat_permohonan
    +'&tanggal_surat_permohonan='+this.state.activenosurat.tanggal_surat_permohonan
    +'&id_kecamatan='+this.state.activenosurat.id_kecamatan
    window.location = url;

>>>>>>> e7ff35ef6641201567841778bdfd875caced6bf0
    this.modalnosuratclose();
  }

  surat_permohonan = (items) =>{
    if(items.no_surat_perizinan!=null){
      const url = 'http://localhost:8000/api/dokumen/cetak_surat_permohonan?token=' + sessionStorage.getItem('token')
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
    }
  }

  cetak_dokumen = (items) => {
    // event.preventDefault();
    if(items.no_surat_perizinan!=null){
      const url = 'http://localhost:8000/api/dokumen/cetak_surat_perizinan?token=' + sessionStorage.getItem('token')
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
      window.location = url;
    }
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
    console.log(this.state.items);
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
              <form className="form-group" onSubmit={this.nomor_surat}>
                <div class="form-group">
                <label>No Surat</label>
                <input type="text" className="form-control" onChange={this.handleChange} name="no_surat"></input>
                </div>
                <input type="submit" className="form-control btn btn-primary" Value="Submit"></input>
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
                        Header: 'Nomor Surat',
                        // accessor: 'status', // String-based value accessors!
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.nosuratmodal(row.row)} className="mr-1">Atur</Button>
                          </div>
                        )
                      },
                      {
                        Header: 'Cetak Surat Permohonan',
                        // accessor: 'status', // String-based value accessors!
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.surat_permohonan(row.row)} className="mr-1">Cetak Dokumen</Button>
                          </div>
                        )
                      },
                      {
                        Header: 'Cetak Surat Izin',
                        // accessor: 'status', // String-based value accessors!
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.cetak_dokumen(row.row)} className="mr-1">Cetak Dokumen</Button>
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
