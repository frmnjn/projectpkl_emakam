import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import usersData from '../../../views/Users/UsersData';
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
import {Map, InfoWindow, Marker, GoogleApiWrapper,Polygon} from 'google-maps-react';


import 'react-table/react-table.css'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


class tpu extends Component {
  constructor(props) {
    super(props);



    this.toggle = this.toggle.bind(this);
    this.toggleSmall = this.toggleSmall.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleEditclose = this.toggleEditclose.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.fetchdata = this.fetchdata.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.mapClicked = this.mapClicked.bind(this);
    this.toggleLocation = this.toggleLocation.bind(this);

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      error: null,
      isLoaded: false,
      items: [],
      kecamatan: [],
      blok: [],

      activename: null,
      activeqty: null,
      activesupplier: null,

      idtpuaktif: null,
      namaaktif: null,
      kecamatanaktif: null,
      kodeaktif:null,
      lat:-7.952229,
      lng:112.613468,

      formqty: '1',


    };


  }



  componentDidMount() {

    this.fetchdata()

  }

  fetchdata() {
    fetch("http://localhost:8000/api/tpu/view?token=" + sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            items: json
          });
        },
    ).then(
    fetch("http://localhost:8000/api/kecamatan/viewall?token=" + sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            kecamatan: json
          });
        },
    )
  )
  }

  handleEdit() {

    fetch('http://localhost:8000/api/tpu/edit/' + this.state.idtpuaktif + "?token=" + sessionStorage.getItem('token'), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama_tpu: this.state.namaaktif,
        id_kecamatan: this.state.kecamatanaktif,
        kode_tpu: this.state.kodeaktif,
      })
    }).then(
      this.fetchdata
    ).then(
      this.setState({
        edit: !this.state.edit
      })
    )
  }

  handleCreate() {

    fetch('http://localhost:8000/api/tpu/create?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama_tpu: this.state.namaaktif,
        id_kecamatan: this.state.kecamatanaktif,
        kode_tpu: this.state.kodeaktif
      })
    }).then(
      this.fetchdata
    ).then(
      this.setState({
        create: !this.state.create
      })
    )
  }

  handleDelete() {

    fetch('http://localhost:8000/api/tpu/delete/' + this.state.idtpuaktif + "?token=" + sessionStorage.getItem('token'), {
      method: 'DELETE',
    }).then(
      this.fetchdata
    ).then(
      this.setState({
        small: !this.state.small
      })
    )
  }

  mapClicked(mapProps, map, event) {
    this.setState({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    })
  }

  handleKode = event => {
    this.setState({ kodeaktif: event.target.value });
  }

  handleNama = event => {
    this.setState({ namaaktif: event.target.value });
  }

  handleKecamatan = event => {
    this.setState({ kecamatanaktif: event.target.value });
  }



  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }


  toggleSmall(items) {
    this.setState({
      small: !this.state.small,
      idtpuaktif: items.id_tpu,
    });
  }

  toggleEdit(items) {
    this.setState({
      edit: !this.state.edit,
      idtpuaktif: items.id_tpu,
      namaaktif: items.nama_tpu,
      kecamatanaktif: items.id_kecamatan,
      kodeaktif: items.kode_tpu,
    });

  }

  toggleEditclose(items) {
    this.setState({
      edit: !this.state.edit,
    });
  }

  toggleCreate() {
    this.setState({
      create: !this.state.create,
    });
  }

  toggleLocation(){
    this.setState({
      location: !this.state.location,
    })
  }




  render() {
    // const {isLoaded, items} = this.state;
    if (!this.state.isLoaded) {
      return (<div style={{ display: 'flex', justifyContent: 'center',margin:100 }}>
      <div className='sweet-loading'>
        <RingLoader
          color={'#123abc'}
        />
      </div>
    </div>)
    } else {
      if (sessionStorage.getItem('login_session') == 0) {
        return (
          <div className="animated fadeIn">

                            <Modal isOpen={this.state.location} toggle={this.toggleLocation}
                                  className={'modal-large ' + this.props.className}>
                              <ModalHeader toggle={this.toggleLocation}>Lokasi Makam</ModalHeader>
                              <ModalBody>
                              <div >
                                  <Row>
                                    <Col style={{height:'50vh'}}>
                                      <Map 
                                        google={this.props.google} zoom={14}
                                        initialCenter={{lat:this.state.lat,lng:this.state.lng}}
                                        zoom={18}     
                                        style={{width:'95%'}}                                  
                                      >

                                        <Marker position={{ lat: this.state.lat, lng: this.state.lng }}onClick={this.onMarkerClick}
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
                                <Button color="secondary" onClick=''>Tutup</Button>
                              </ModalFooter>
                            </Modal>

            <Modal isOpen={this.state.edit} toggle={this.toggleEditclose}
              className={'modal-sm ' + this.props.className}>
              <ModalHeader toggle={this.toggleEditclose}>edit</ModalHeader>
              <ModalBody>
                <Row>
                  <Col xs="12">
                    <div className="small text-muted">
                      <span>Ubah Data TPU</span>
                    </div>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="12">
                    <Input onChange={this.handleNama} type="text" id="input1-group3" name="input1-group3" value={this.state.namaaktif} />
                    <br />
                    <Input onChange={this.handleKode} type="text" id="input1-group3" name="input1-group3" value={this.state.kodeaktif} />
                    <br/>
                    <Input onChange={this.handleKecamatan} type="select" name="" id="blok">
                      <option>Pilih Kecamatan</option>
                          {this.state.kecamatan.map((items) =>{
                              return(
                                <option value={items.id_kecamatan} selected={items.id_kecamatan==this.state.kecamatanaktif}>{items.nama}</option>
                              )
                            })
                          }
                    </Input><br/>
                    <hr/>
                        <Row>
                                      <Col style={{
                                          height:'50vh',
                                          width:'5vw'
                                        }}>
                                       <Map 
                                        onClick={this.mapClicked} 
                                        google={this.props.google} zoom={14}
                                        initialCenter={{lat:this.state.lat,lng:this.state.lng}}
                                        zoom={18}
                                        style={{width:'90%'}}
                                        >
  
                                        <Marker position={{ lat: this.state.lat, lng: this.state.lng }}onClick={this.onMarkerClick}
                                                name={'Current location'} />

                                        <InfoWindow onClose={this.onInfoWindowClose}>
                                            <div>
                                              <h1>Lalala</h1>
                                            </div>
                                        </InfoWindow>
                                        </Map>
                                      </Col>
                        </Row>
                      <hr/>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.handleEdit}>edit</Button>{' '}
                <Button color="secondary" onClick={this.toggleEditclose}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.create} toggle={this.toggleCreate}
              className={'modal-sm ' + this.props.className}>
              <ModalHeader toggle={this.toggleCreate}>Buat Baru</ModalHeader>
              <ModalBody>
                <Row>
                  <Col xs="12">
                    <div className="small text-muted">
                      <span>Masukan Data</span>
                    </div>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="12">
                    <Input onChange={this.handleNama} type="text" id="input1-group3" name="input1-group3" placeholder='Nama TPU' />
                  </Col><br /><br />
                  <Col xs="12">
                    <Input onChange={this.handleKode} type="text" id="input1-group3" name="input1-group3" placeholder='Kode TPU' />
                  </Col><br /><br />
                  <Col xs="12">
                    <Input onChange={this.handleKecamatan} type="select" name="" id="blok">
                      <option>Pilih Kecamatan</option>
                          {this.state.kecamatan.map((items) =>{
                              return(
                                <option value={items.id_kecamatan} >{items.nama}</option>
                              )
                            })
                          }
                    </Input><br/>                  
                  </Col>
                </Row>
                <hr/>
                                    <Row>
                                      <Col style={{
                                          height:'50vh',
                                          width:'5vw'
                                        }}>
                                       <Map 
                                        onClick={this.mapClicked} 
                                        google={this.props.google} zoom={14}
                                        initialCenter={{lat:this.state.lat,lng:this.state.lng}}
                                        zoom={18}
                                        style={{width:'90%'}}
                                        >

  
                                        <Marker position={{ lat: this.state.lat, lng: this.state.lng }}onClick={this.onMarkerClick}
                                                name={'Current location'} />

                                        <InfoWindow onClose={this.onInfoWindowClose}>
                                            <div>
                                              <h1>Lalala</h1>
                                            </div>
                                        </InfoWindow>
                                        </Map>
                                      </Col>
                                    </Row>
                <hr/>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.handleCreate}>Buat</Button>
                <Button color="secondary" onClick={this.toggleCreate}>Batal</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.small} toggle={this.toggleSmall}
              className={'modal-sm ' + this.props.className}>
              <ModalHeader toggle={this.toggleSmall}></ModalHeader>
              <ModalBody>
                <strong>Menghapus makam akan menghapus seluruh data penghuni makam</strong>
                <br /><br /><br />
                <strong>Apakah anda yakin ingin menghapus makam {this.state.idtpuaktif} ?</strong>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => this.handleDelete()}>hapus</Button>{' '}
                <Button color="secondary" onClick={this.toggleSmall}>batal</Button>
              </ModalFooter>
            </Modal>
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <Row>
                      <Col col="10" ><strong>Manajemen TPU</strong></Col>
                      <Col col="2" className="text-right">
                        <Button onClick={this.toggleCreate} outline color="primary">Create</Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <ReactTable
                      data={this.state.items}
                      defaultPageSize={10}
                      filterable
                      columns={[
                        { accessor: 'id_tpu', show: false },
                        { accessor: 'kode_tpu', show: false },
                        { accessor: 'id_kecamatan', show: false },
                        {
                          Header: 'Nama TPU',
                          accessor: 'nama_tpu' // String-based value accessors!
                        },
                        {
                          Header: 'Kecamatan',
                          accessor: 'nama', // String-based value accessors!
                        },
                        {
                          Header: 'Actions',
                          accessor: 'id_blok', // String-based value accessors!
                          filterable: false,
                          Cell: row => (
                            <div>
                              <Row>
                                <Col col="2" xl className="mb-1 mb-xl-0">
                                  <Button onClick={this.toggleLocation} block outline color="primary"><i className="cui-location-pin icons text-left"></i> Lokasi</Button>
                                </Col>
                                <Col col="2" xl className="mb-1 mb-xl-0">
                                  <Button onClick={() => this.toggleEdit(row.row)} block outline color="success"><i className="cui-pencil icons text-left"></i> Ubah</Button>
                                </Col>
                                <Col col="2" xl className="mb-1 mb-xl-0">
                                  <Button onClick={() => this.toggleSmall(row.row)} block outline color="danger"><i className="cui-circle-x icons text-left"></i> Hapus</Button>
                                </Col>
                              </Row>
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
})(tpu)

