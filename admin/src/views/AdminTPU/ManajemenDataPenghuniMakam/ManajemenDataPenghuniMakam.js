import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Row,
  Table,
  Modal,
  ModalBody, ModalFooter, ModalHeader,
  Input,
  InputGroup,
  InputGroupAddon,

} from 'reactstrap';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactTable from "react-table";
import { RingLoader } from 'react-spinners';
import GoogleMapReact from 'google-map-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper,Polygon} from 'google-maps-react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css'




class ManajemenDataPenghuniMakam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // primary: false,
      // large: false,
      // modal: false,

      startDate: moment(),
      isLoaded: false,
      lng:112.613468,
      lat:-7.952229,
      list: [],
      makam: [],
      nama: "",
      alamat_terakhir: "",
      tanggal_wafat: '',
      status: "",
      id_makam: "",
      kode_makam: "",
      nama_ahli_waris: "",
      alamat_ahli_waris: "",
      nik_ahli_waris: "",
      kontak_ahli_waris: "",

      activeid_penghuni_makam: "",
      activenama: "",
      activealamat_terakhir: "",
      activetanggal_wafat: '',
      activestatus: "",
      activeid_makam: "",
      activekode_makam: "",
      splittanggalwafat: '',
      activenama_ahli_waris: "",
      activealamat_ahli_waris: "",
      activenik_ahli_waris: "",
      activekontak_ahli_waris: "",



    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.togglelargeclose = this.togglelargeclose.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.toggleclose = this.toggleclose.bind(this);
    this.toggleLocation = this.toggleLocation.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.fetchall = this.fetchall.bind(this);

    this.fetchall()


  }

  fetchall() {
    fetch('http://localhost:8000/api/penghuni_makam/view?token=' + sessionStorage.getItem('token') + '&id_user=' + sessionStorage.getItem('id_user'))
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            list: result
          }); //console.log(result);
        },
    ).then(
      fetch('http://localhost:8000/api/makam/view?token=' + sessionStorage.getItem('token') + '&id_user=' + sessionStorage.getItem('id_user'))
        .then(response => response.json())
        .then(
          (result) => {
            this.setState({
              makam: result,
              isLoaded: true
            }); //console.log(result);
          },
      )
    )
  }

  toggle(list) {
    this.setState({
      activeid_penghuni_makam: list.id_penghuni_makam,
      activenama: list.nama,
      activealamat_terakhir: list.alamat_terakhir,
      activetanggal_wafat: list.tanggal_wafat.substring(0, 10),
      activestatus: list.status,
      activeid_makam: list.id_makam,
      activenama_ahli_waris: list.nama_ahli_waris,
      activealamat_ahli_waris: list.alamat_ahli_waris,
      activenik_ahli_waris: list.nik_ahli_waris,
      activekontak_ahli_waris: list.kontak_ahli_waris,
      modal: !this.state.modal,
    });
  }

  toggleclose() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  toggleLarge(list) {
    this.setState({
      activeid_penghuni_makam: list.id_penghuni_makam,
      activenama: list.nama,
      activealamat_terakhir: list.alamat_terakhir,
      activetanggal_wafat: moment(list.tanggal_wafat),
      activestatus: list.status,
      activeid_makam: list.id_makam,
      activenama_ahli_waris: list.nama_ahli_waris,
      activealamat_ahli_waris: list.alamat_ahli_waris,
      activenik_ahli_waris: list.nik_ahli_waris,
      activekontak_ahli_waris: list.kontak_ahli_waris,
      large: !this.state.large,

    });

  }

  togglelargeclose() {
    this.setState({
      large: !this.state.large,
    })
  }

  togglePrimary() {
    this.setState({
      tanggal_wafat: this.state.startDate,
      primary: !this.state.primary,
    });
  }

  componentDidMount() {
  }

  handleDate(date) {
    this.setState({
      activetanggal_wafat: date,
      tanggal_wafat: date,
    });
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmitCreate = event => {
    event.preventDefault();
    console.log(this.state.list);
    fetch('http://localhost:8000/api/penghuni_makam/create?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: this.state.nama,
        alamat_terakhir: this.state.alamat_terakhir,
        tanggal_wafat: this.state.tanggal_wafat.format().substring(0, 10),
        status: this.state.status,
        id_makam: this.state.id_makam,
        nama_ahli_waris: this.state.nama_ahli_waris,
        alamat_ahli_waris: this.state.alamat_ahli_waris,
        nik_ahli_waris: this.state.nik_ahli_waris,
        kontak_ahli_waris: this.state.kontak_ahli_waris
      })
    }).then(
      this.fetchall
    ).then(
      this.setState({
        primary: !this.state.primary
      })
    )
    alert("Data penghuni baru berhasil ditambahkan!");
  }

  handleSubmitEdit = event => {
    event.preventDefault();

    fetch('http://localhost:8000/api/penghuni_makam/update/' + this.state.activeid_penghuni_makam + "?token=" + sessionStorage.getItem('token'), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: this.state.activenama,
        alamat_terakhir: this.state.activealamat_terakhir,
        tanggal_wafat: this.state.activetanggal_wafat.format().substring(0, 10),
        status: this.state.activestatus,
        id_makam: this.state.activeid_makam,
        nama_ahli_waris: this.state.activenama_ahli_waris,
        alamat_ahli_waris: this.state.activealamat_ahli_waris,
        nik_ahli_waris: this.state.activenik_ahli_waris,
        kontak_ahli_waris: this.state.activekontak_ahli_waris
      })
    }).then(
      this.fetchall
    ).then(
      this.setState({
        large: !this.state.large
      })
    )
    alert("Data berhasil di update!");
  }

  handledelete(list) {
    fetch('http://localhost:8000/api/penghuni_makam/delete/' + list.id_penghuni_makam + "?token=" + sessionStorage.getItem('token'), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    alert("Data user dengan id " + this.state.activeid_penghuni_makam + " berhasil di hapus!");
  }

  toggleLocation(){
    this.setState({
      location: !this.state.location,
    })
  }

  render() {
    if (!this.state.isLoaded) {
      return (<div style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
        <div className='sweet-loading'>
          <RingLoader
            color={'#123abc'}
          />
        </div>
      </div>)
    } else {
      if (sessionStorage.getItem('login_session') == "1") {
        return (
          <div className="animated fadeIn">
            <Row>
              <Col xl={12}>
                <Card>
                  <CardHeader>
                    <Row>
                      <Col col="10" >
                        <strong>Tabel Data Penghuni Makam</strong><br />
                        Date today : {this.state.startDate.format().substring(0, 10)}
                      </Col>
                      <Col col="2" className="text-right">
                        <Button onClick={this.togglePrimary} outline color="primary">Create</Button>
                      </Col>
                    </Row>

                  </CardHeader>
                  <CardBody>
                    <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                      className={'modal-primary ' + this.props.className}>
                      <ModalHeader toggle={this.togglePrimary}>Buat Data Penghuni Makam</ModalHeader>
                      <ModalBody>
                        <form className="form-group" onSubmit={this.handleSubmitCreate}>
                          <label>Nama Penghuni Makam</label>
                          <input type="text" className="form-control" name="nama" placeholder="Nama Penghuni" onChange={this.handleChange}></input>
                          <label>Alamat Terakhir</label>
                          <input type="text" className="form-control" name="alamat_terakhir" placeholder="Alamat Terakhir" onChange={this.handleChange}></input>
                          <br />
                          <label>Tanggal Wafat</label>
                          <DatePicker dateFormat="DD/MM/YYYY" selected={this.state.tanggal_wafat} onChange={this.handleDate} />
                          <br />
                          <label>Status</label>
                          <Input type="select" className="form-control" name="status" onChange={this.handleChange}>
                            <option value='Diperpanjang'>Diperpanjang</option>
                            <option value='Expired'>Expired</option>
                            <option value='Ditimpa'>Ditimpa</option>
                          </Input>
                          <label>Pilih Nomor Makam (ID Makam)</label>
                          <Input type="select" className="form-control" name="id_makam" onChange={this.handleChange}>
                            {this.state.makam.map((items) => {
                              return (
                                <option value={items.id_makam}>{items.kode_makam}</option>
                              )
                            }
                            )}
                          </Input>
                          <label>Nama Ahli Waris</label>
                          <input type="text" className="form-control" name="nama_ahli_waris" placeholder="Nama Ahli Waris" onChange={this.handleChange}></input>
                          <label>Alamat Ahli Waris</label>
                          <input type="text" className="form-control" name="alamat_ahli_waris" placeholder="Alamat Ahli Waris" onChange={this.handleChange}></input>
                          <label>NIK Ahli Waris</label>
                          <input type="text" className="form-control" name="nik_ahli_waris" placeholder="NIK Ahli Waris" onChange={this.handleChange}></input>
                          <label>Kontak Ahli Waris</label>
                          <input type="text" className="form-control" name="kontak_ahli_waris" placeholder="Kontak Ahli Waris" onChange={this.handleChange}></input>
                          <input type="submit" className="form-control btn btn-primary" value="Submit"></input>
                        </form>
                      </ModalBody>
                      <ModalFooter>
                      </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.modal} toggle={this.toggleclose}
                      className={'modal-Large ' + this.props.className}>
                      <ModalHeader toggle={this.toggleclose}>Lihat Data Penghuni Makam</ModalHeader>
                      <ModalBody>
                        <form className="form-group" onSubmit=''>
                          <label>ID</label>
                          <input type="text" className="form-control" name="activeid_penghuni_makam" onChange={this.handleChange} value={this.state.activeid_penghuni_makam} disabled></input>
                          <label>Nama Penghuni Makam</label>
                          <input type="text" className="form-control" name="activenama" onChange={this.handleChange} value={this.state.activenama} disabled></input>
                          <label>Alamat Terakhir</label>
                          <input type="text" className="form-control" name="activealamat_terakhir" onChange={this.handleChange} value={this.state.activealamat_terakhir} disabled></input>
                          <label>Tanggal Wafat</label>
                          <input type="text" className="form-control" name="activetanggal_wafat" onChange={this.handleChange} value={this.state.activetanggal_wafat} disabled></input>
                          <label>Status</label>
                          <input type="text" className="form-control" name="activestatus" onChange={this.handleChange} value={this.state.activestatus} disabled></input>
                          <label>ID Makam</label>
                          <input type="text" className="form-control" name="activeid_makam" onChange={this.handleChange} value={this.state.activeid_makam} disabled></input>
                          <label>Nama Ahli Waris</label>
                          <input type="text" className="form-control" name="activenama_ahli_waris" onChange={this.handleChange} value={this.state.activenama_ahli_waris} disabled></input>
                          <label>Alamat Ahli Waris</label>
                          <input type="text" className="form-control" name="activealamat_ahli_waris" onChange={this.handleChange} value={this.state.activealamat_ahli_waris} disabled></input>
                          <label>NIK Ahli Waris</label>
                          <input type="text" className="form-control" name="activenik_ahli_waris" onChange={this.handleChange} value={this.state.activenik_ahli_waris} disabled></input>
                          <label>Kontak Ahli Waris</label>
                          <input type="text" className="form-control" name="activekontak_ahli_waris" onChange={this.handleChange} value={this.state.activekontak_ahli_waris} disabled></input>
                        </form>
                      </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.large} toggle={this.togglelargeclose}
                      className={'modal-Large ' + this.props.className}>
                      <ModalHeader toggle={this.togglelargeclose}>Edit Data Penghuni Makam</ModalHeader>
                      <ModalBody>
                        <form className="form-group" onSubmit={this.handleSubmitEdit}>
                          <label>ID</label>
                          <input type="text" className="form-control" name="activeid_penghuni_makam" onChange={this.handleChange} value={this.state.activeid_penghuni_makam} disabled></input>
                          <label>Nama Penghuni Makam</label>
                          <input type="text" className="form-control" name="activenama" onChange={this.handleChange} value={this.state.activenama}></input>
                          <label>Alamat Terakhir</label>
                          <input type="text" className="form-control" name="activealamat_terakhir" onChange={this.handleChange} value={this.state.activealamat_terakhir}></input>
                          <br />
                          <label>Tanggal Wafat</label>
                          <DatePicker dateFormat="DD/MM/YYYY" selected={this.state.activetanggal_wafat} onChange={this.handleDate} />
                          <br />
                          {/* <input type="text" className="form-control" name="activetanggal_wafat" onChange={this.handleChange} value={this.state.activetanggal_wafat}></input> */}
                          <label>Status</label>
                          <Input type="select" className="form-control" name="activestatus" onChange={this.handleChange} defaultValue={this.state.activestatus}>
                            <option value='Diperpanjang'>Diperpanjang</option>
                            <option value='Expired'>Expired</option>
                            <option value='Ditimpa'>Ditimpa</option>
                          </Input>
                          <label>Pilih Nomor Makam (ID Makam)</label>
                          <Input type="select" className="form-control" name="id_makam" placeholder="dropdown" onChange={this.handleChange}>
                            {this.state.makam.map((items) => {
                              return (
                                <option value={items.id_makam}>{items.kode_makam}</option>
                              )
                            }
                            )}
                          </Input>
                          <label>Nama Ahli Waris</label>
                          <input type="text" className="form-control" name="activenama_ahli_waris" onChange={this.handleChange} value={this.state.activenama_ahli_waris}></input>
                          <label>Alamat Ahli Waris</label>
                          <input type="text" className="form-control" name="activealamat_ahli_waris" onChange={this.handleChange} value={this.state.activealamat_ahli_waris}></input>
                          <label>NIK Ahli Waris</label>
                          <input type="text" className="form-control" name="activenik_ahli_waris" onChange={this.handleChange} value={this.state.activenik_ahli_waris}></input>
                          <label>Kontak Ahli Waris</label>
                          <input type="text" className="form-control" name="activekontak_ahli_waris" onChange={this.handleChange} value={this.state.activekontak_ahli_waris}></input>
                          <input type="submit" className="form-control btn btn-success" value="Submit"></input>
                        </form>
                      </ModalBody>
                      <ModalFooter>
                      </ModalFooter>
                    </Modal>
                    <div>
                      <ReactTable
                        data={this.state.list}
                        resolveData={data => data.map(row => row)}
                        defaultPageSize={10}
                        filterable
                        columns={[
                          {
                            Header: 'Nama',
                            show: false,
                            accessor: 'id_penghuni_makam' // String-based value accessors!
                          },
                          {
                            Header: 'Alamat Ahli Waris',
                            show: false,
                            accessor: 'alamat_ahli_waris' // String-based value accessors!
                          },
                          {
                            Header: 'NIK Ahli Waris',
                            show: false,
                            accessor: 'nik_ahli_waris' // String-based value accessors!
                          },
                          {
                            Header: 'NIK Ahli Waris',
                            show: false,
                            accessor: 'kontak_ahli_waris' // String-based value accessors!
                          },
                          {
                            Header: 'Nama',
                            accessor: 'nama' // String-based value accessors!
                          },
                          {
                            Header: 'Alamat Terakhir',
                            accessor: 'alamat_terakhir' // String-based value accessors!
                          },
                          {
                            Header: 'TPU',
                            accessor: 'nama_tpu' // String-based value accessors!
                          },
                          {
                            Header: 'Kode Makam',
                            accessor: 'kode_makam' // String-based value accessors!
                          },
                          {
                            Header: 'Ahli Waris',
                            accessor: 'nama_ahli_waris' // String-based value accessors!
                          },
                          {
                            Header: 'Tanggal Wafat',
                            accessor: 'tanggal_wafat' // String-based value accessors!
                          },
                          {
                            Header: 'Status',
                            accessor: 'status' // String-based value accessors!
                          },
                          {
                            Header: '',
                            accessor: 'id_blok', // String-based value accessors!
                            filterable: false,
                            Cell: row => (
                              <div>
                                <Row>
                                  &emsp;
                                  <Button onClick={this.toggleLocation} outline color="primary"><i className="cui-location-pin icons text-left"></i> </Button>
                                  &emsp;

                                <Col col="1" xl className="">
                                  </Col>
                                  <Col col="1" xl className="">
                                  </Col>
                                </Row>
                              </div>
                            )
                          },
                          {
                            Header: '',
                            filterable: false,
                            Cell: row => (<Button color="info" onClick={() => this.toggle(row.row)} className="mr-1">Lihat</Button>)
                          },
                          {
                            Header: '',
                            filterable: false,
                            Cell: row => (<Button color="success" onClick={() => this.toggleLarge(row.row)} className="mr-1">Edit</Button>)
                          },
                          {
                            Header: '',
                            filterable: false,
                            Cell: row => (<Button color="danger" onClick={() => { if (window.confirm('Anda yakin untuk menghapus Data ini?')) this.handledelete(row.row) }} className="mr-1">Delete</Button>)
                          },
                        ]}
                      />
                      <hr></hr>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Modal isOpen={this.state.location} toggle={this.toggleLocation}
              className={'modal-large ' + this.props.className}>
              <ModalHeader toggle={this.toggleLocation}>Lokasi Makam</ModalHeader>
              <ModalBody>
                <div >
                  <Row>
                    <Col style={{ height: '50vh' }}>
                      <Map
                        google={this.props.google} zoom={14}
                        initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
                        zoom={18}
                        style={{ width: '95%' }}
                      >

                        <Marker position={{ lat: this.state.lat, lng: this.state.lng }} onClick={this.onMarkerClick}
                          name={'Current location'} />

                        <InfoWindow onClose={this.onInfoWindowClose}>
                          <div>
                            <h1>Lalala</h1>
                          </div>
                        </InfoWindow>
                      </Map>
                    </Col>
                  </Row>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleLocation}>Tutup</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      } else if (sessionStorage.getItem('login_session') == "0") {
        return (
          <div>
            {alert("Anda tidak memiliki hak akses!")}
            <Redirect to="/login" />
          </div>
        );
      } else {
        return (
          <Redirect to="/404" />
        );
      }
    }
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDTUAyUGbuCXiRX6ywsz4ZIAf_jDPPRwUM')
})(ManajemenDataPenghuniMakam)
//export default ManajemenDataPenghuniMakam;
