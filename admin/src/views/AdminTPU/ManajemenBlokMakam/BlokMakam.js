import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import usersData from '../../../views/Users/UsersData';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input
} from 'reactstrap';
import ReactTable from "react-table";
import { RingLoader } from 'react-spinners';
import {Map, InfoWindow, Marker, GoogleApiWrapper,Polygon} from 'google-maps-react';
import 'react-table/react-table.css'

class BlokMakam extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleSmall = this.toggleSmall.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleEditclose = this.toggleEditclose.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleLocation = this.toggleLocation.bind(this);
    this.toggleLocationClose = this.toggleLocationClose.bind(this);

    this.handleEdit = this.handleEdit.bind(this);
    this.fetchblok = this.fetchblok.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.fetchtpu = this.fetchtpu.bind(this);
    this.fetchpolygon = this.fetchpolygon.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.mapClicked = this.mapClicked.bind(this);
    this.viewpolygon = this.viewpolygon.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      error: null,
      isLoaded: false,
      items: [],
      blok: [],
      tpu_role:[],
      tpu:[],
      polygon:[
        // {lat:-7.956273, lng:112.613289},
        // {lat:-7.954637, lng:112.611814},
        // {lat:-7.949469, lng:112.609006},
        // {lat:-7.947670, lng:112.613490},
        // {lat:-7.955008, lng:112.620526},
        // {lat:-7.956426, lng:112.617328}
      ],
      newpolygon:[],

      dummy:[],

      activename: null,
      activeqty: null,
      activesupplier: null,

      lng:112.61316118043442,
      lat:-7.952687231547793,
      idtpuaktif:null,
      idblokaktif: null,
      nomoraktif: null,
      blokaktif: null,
      kodeaktif: null,
      kodetpuaktif: null,

      formqty: '1',
    };

    this.fetchblok();
    this.fetchtpu();
    this.fetchpolygon();
  }

  componentDidMount() {
    
  }

  fetchtpu(){
    fetch('http://api.emakam.tujuhlangit.id/api/tpu/view_byUser?token='+sessionStorage.getItem('token')+'&id_user='+sessionStorage.getItem('id_user'))
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            tpu: result
          });
        },
      )
  }

  fetchblok() {
    fetch("http://api.emakam.tujuhlangit.id/api/blok/view?token=" + sessionStorage.getItem('token')+'&id_user='+sessionStorage.getItem('id_user'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {         
          this.setState({
            isLoaded: true,
            blok: json
          });
        },
    )
  }

  fetchpolygon() {
    fetch('http://api.emakam.tujuhlangit.id/api/polygon/view?token='+sessionStorage.getItem('token'))
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            dummy: result
          });
        },
      )
  }

  viewpolygon(id_blok){
    //alert(id_blok)
    var raw=this.state.dummy
    console.log(raw)

    


    raw = raw.filter(function(item){
      return item.id_blok === id_blok
    })

    var data=[]

    raw.map((items)=>{
      data.push({lat:parseFloat(items.lat),lng:parseFloat(items.lng)})
      this.setState({
        lat:items.lat,
        lng:items.lng
      })
    })

    console.log(data)
    return data
  }

  createpolygon(items) {

    fetch('http://api.emakam.tujuhlangit.id/api/polygon/create?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_blok: this.state.idblokaktif,
        lat: items.lat,
        lng: items.lng,
      })
    })
  }

  detelepolygon() {

    fetch('http://api.emakam.tujuhlangit.id/api/polygon/delete/'+this.state.idblokaktif + "?token=" + sessionStorage.getItem('token'), {
      method: 'DELETE',
    })
  }

  handleEdit() {

      this.detelepolygon()

      this.state.newpolygon.map((items) => {
        this.createpolygon(items)
      })
    

    fetch('http://api.emakam.tujuhlangit.id/api/blok/edit/' + this.state.idblokaktif + "?token=" + sessionStorage.getItem('token'), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kode_blok: this.state.kodetpuaktif+'-'+this.state.kodeaktif,
        id_tpu: this.state.idtpuaktif,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      alert(responseJson)
    }).then(
      this.setState({
        edit: !this.state.edit
      })
    ).then(
      this.fetchblok,
    ).then(
      this.fetchpolygon
    ).catch((err)=>{
      this.setState({
        isLoaded: false
      })
      alert("Permintaan tidak dapat diproses")
    })
  }

  handleCreate() {

    fetch('http://api.emakam.tujuhlangit.id/api/blok/create?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_tpu: this.state.idtpuaktif,
        kode_blok: this.state.kodetpuaktif+'-'+this.state.kodeaktif,

      })
    }).then(response => response.json())
    .then(
      (result) => {
        if(result.message==null){
          this.state.newpolygon.map((items) => {
            fetch('http://api.emakam.tujuhlangit.id/api/polygon/create?token=' + sessionStorage.getItem('token'), {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_blok: result.id_blok,
                lat: items.lat,
                lng: items.lng,
              })
            })
          })
          alert("pembuatan blokmakam sukses")
        }else{
          alert("pembuatan blokmakam gagal")
        }
      }
    )
    .then(
      this.setState({
        create: !this.state.create
      })
    ).then(
      this.fetchblok,
    ).then(
      this.fetchpolygon
    ).catch((err)=>{
      this.setState({
        isLoaded: false
      })
      alert("Permintaan tidak dapat diproses")
    })
  }

  handleDelete() {

    this.detelepolygon();

    fetch('http://api.emakam.tujuhlangit.id/api/blok/delete/' + this.state.idblokaktif + "?token=" + sessionStorage.getItem('token'), {
      method: 'DELETE',
    }).then((response) => response.json())
    .then((responseJson) => {alert(responseJson)}).then(
      this.fetchblok()
    ).then(
      this.setState({
        small: !this.state.small
      })
    ).then(
      this.fetchblok
    ).catch((err)=>{
      this.setState({
        isLoaded: false
      })
      alert("Permintaan tidak dapat diproses")
    })
  }

  mapClicked(mapProps, map, event) {
    this.setState({
      newpolygon:this.state.newpolygon.concat({lat:event.latLng.lat(),lng:event.latLng.lng()}),
      lat:event.latLng.lat(),
      lng:event.latLng.lng()
    })

  }

  handleKode = event => {
    this.setState({ kodeaktif: event.target.value });
  }

  handleChangeOption = event => {
    var tpu = event.target.value.split(',') 
    this.setState({ idtpuaktif: tpu[0] , kodetpuaktif: tpu[1]});
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
      idblokaktif: items.id_blok,
    });
  }

  toggleEdit(items) {
    var blok=items.kode_blok.split('-')
    this.setState({
      newpolygon: [],
      edit: !this.state.edit,
      kodetpuaktif:items.kode_tpu,
      idblokaktif: items.id_blok,
      idtpuaktif: items.id_tpu,
      kodeaktif: blok[1],
    });
  }


  toggleEditclose() {
    this.setState({
      edit: !this.state.edit,
    });
  }

  toggleCreate() {
    this.setState({
      newpolygon: [],
      create: !this.state.create,
    });
  }
  
  toggleLocation(items){
    var data=this.viewpolygon(items.id_blok)
    this.setState({
      polygon: data,
      location: !this.state.location,
    })
  }

  toggleLocationClose(){
    this.setState({
      location: !this.state.location,
      lat:this.state.lat,
      lng:this.state.lng,
    })
  }



  render() {
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
      if (sessionStorage.getItem('login_session') == 1) {
        return (
          <div className="animated fadeIn">
            <Row>
              <Col>
                <Modal isOpen={this.state.edit} toggle={this.toggleEditclose}
                  className={'modal-sm ' + this.props.className}>
                  <ModalHeader toggle={this.toggleEditclose}>edit</ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col xs="12">
                        <div className="small text-muted">
                          <span>Kode Blok</span>
                        </div>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col xs="12">
                          <select class="form-control" onChange={this.handleChangeOption}>
                            {this.state.tpu.map((tpu) => {
                              return (
                                <option value={tpu.id_tpu+','+tpu.kode_tpu} selected={tpu.id_tpu==this.state.idtpuaktif}>{tpu.nama_tpu}</option>
                              )
                            })}
                          </select>    
                          <br/>
                            <Input onChange={this.handleKode} type="text" id="input1-group3" name="input1-group3" value={this.state.kodeaktif} />
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
                                        zoom={16}
                                        style={{width:'90%'}}
                                        >

                                         <Polygon
                                          paths={this.state.newpolygon}
                                          strokeColor="#0000FF"
                                          strokeOpacity={0.8}
                                          strokeWeight={2}
                                          fillColor="#0000FF"
                                          fillOpacity={0.35} /> 

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
                    <br/>
                          <select class="form-control" onChange={this.handleChangeOption}>
                            <option value=''>Pilih Tpu</option>
                            {this.state.tpu.map((tpu) => {
                              return (
                                <option value={tpu.id_tpu+','+tpu.kode_tpu}>{tpu.nama_tpu}</option>
                              )
                            })}
                          </select>       
                    <br/>
                    <Row>
                      <Col xs="12">
                        <Input onChange={this.handleKode} type="text" id="input1-group3" name="input1-group3" placeholder='Kode Blok' />
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
                                        zoom={15}
                                        style={{width:'90%'}}
                                        >

                                         <Polygon
                                          paths={this.state.newpolygon}
                                          strokeColor="#0000FF"
                                          strokeOpacity={0.8}
                                          strokeWeight={2}
                                          fillColor="#0000FF"
                                          fillOpacity={0.35} /> 

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
            -                    <br /><br /><br />
                                <strong>Apakah anda yakin ingin menghapus makam {this.state.idblokaktif} ?</strong>
                              </ModalBody>
                              <ModalFooter>
                                <Button color="danger" onClick={() => this.handleDelete()}>hapus</Button>{' '}
                                <Button color="secondary" onClick={this.toggleSmall}>batal</Button>
                              </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.location} toggle={this.toggleLocationClose}
                                  className={'modal-large ' + this.props.className}>
                              <ModalHeader toggle={this.toggleLocation}>Poligon Blok Makam</ModalHeader>
                              <ModalBody>
                              <div >
                                  <Row>
                                    <Col style={{height:'50vh'}}>
                                      <Map 
                                        google={this.props.google} 
                                        initialCenter={{lat:this.state.lat,lng:this.state.lng}}
                                        zoom={15}     
                                        style={{width:'95%'}}                                  
                                      >

                                        <Polygon
                                          paths={this.state.polygon}
                                          strokeColor="#0000FF"
                                          strokeOpacity={0.8}
                                          strokeWeight={2}
                                          fillColor="#0000FF"
                                          fillOpacity={0.35} /> 

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
                                <Button color="secondary" onClick={this.toggleLocationClose}>Tutup</Button>
                              </ModalFooter>
                            </Modal>
                <Card>
                  <CardHeader>
                    <Row>
                      <Col col="10" ><strong>Manajemen Blok Makam</strong></Col>
                      <Col col="2" className="text-right">
                        <Button onClick={this.toggleCreate} outline color="primary">Create</Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <ReactTable
                      data={this.state.blok}
                      defaultPageSize={10}
                      filterable
                      columns={[
                        { accessor: 'id_blok', show: false },
                        { accessor: 'id_tpu', show: false },
                        { accessor: 'kode_tpu', show: false },
                        {
                          Header: 'Kode Blok',
                          accessor: 'kode_blok' // String-based value accessors!
                        },
                        {
                          Header: 'TPU',
                          accessor: 'nama_tpu', // String-based value accessors!
                          Cell: row => (
                            <div>
                              {row.row.nama_tpu}
                            </div>
                          )
                        },
                        {
                          Header: 'Actions',
                          accessor: 'id_blok', // String-based value accessors!
                          filterable: false,
                          Cell: row => (
                            <div>
                              <Row>
                                  &emsp;
                                  <Button onClick={()=>this.toggleLocation(row.row)} outline color="primary"><i className="cui-location-pin icons text-left"></i></Button>
                                  &emsp;
                                  <Button onClick={() => this.toggleEdit(row.row)} outline color="success"><i className="cui-pencil icons text-left"></i></Button>
                                  &emsp;
                                  <Button onClick={() => this.toggleSmall(row.row)}  outline color="danger"><i className="cui-circle-x icons text-left"></i></Button>
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
})(BlokMakam)
