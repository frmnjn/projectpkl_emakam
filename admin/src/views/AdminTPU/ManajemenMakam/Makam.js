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
import GoogleMapReact from 'google-map-react';
import { RingLoader } from 'react-spinners';
import {Map, InfoWindow, Marker, GoogleApiWrapper,Polygon} from 'google-maps-react';

import moment from 'moment';
import 'react-table/react-table.css'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
const AnyReactComponent = ({ text }) => <div><img src="assets/img/map-marker1.png" class="rounded" alt="..."></img>{text}</div>;

class Makam extends Component {
  constructor(props) {
    super(props);

    
    
    this.toggle = this.toggle.bind(this);
    this.toggleSmall = this.toggleSmall.bind(this);
    this.toggleSmallclose = this.toggleSmallclose.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleEditclose = this.toggleEditclose.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleLocation = this.toggleLocation.bind(this);
    this.toggleLocationClose = this.toggleLocationClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.fetchmakam = this.fetchmakam.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.mapClicked = this.mapClicked.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.fetchpenghuni = this.fetchpenghuni.bind(this);
    this.status_penghuni = this.status_penghuni.bind(this);
    this.status_terisi = this.status_terisi.bind(this);


    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      error: null,
      isLoaded: false,
      items: [],
      blok: [],
      penghuni:[],


      lng:null,
      lat:null,
      idmakamaktif:null,
      nomoraktif:null,
      blokaktif:null,
      kodeaktif:null,      
      formqty:'1',

      
    };

      
  }



  componentDidMount() {
    
    this.fetchmakam()
    this.fetchpenghuni()
    
    fetch("http://api.emakam.tujuhlangit.id/api/blok/view?token="+sessionStorage.getItem('token')+'&id_user='+sessionStorage.getItem('id_user'))
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

  fetchmakam(){
    fetch("http://api.emakam.tujuhlangit.id/api/makam/view?token="+sessionStorage.getItem('token')+'&id_user='+sessionStorage.getItem('id_user'))
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
      )
  }

  fetchpenghuni(){
    fetch('http://api.emakam.tujuhlangit.id/api/penghuni_makam/view?token=' + sessionStorage.getItem('token') + '&id_user=' + sessionStorage.getItem('id_user'))
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            penghuni: result
          }); //console.log(result);
        },
    )
  }

  handleEdit(items){
    
    fetch('http://api.emakam.tujuhlangit.id/api/makam/edit/'+this.state.idmakamaktif+"?token="+sessionStorage.getItem('token'), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_blok: this.state.blokaktif,
        nomor_makam: this.state.nomoraktif,
        kode_makam: this.state.kodeaktif+'-'+this.state.nomoraktif,
        lat:this.state.lat,
        lng:this.state.lng
      })
    }).then((response)=>response.json())
    .then((responseJson)=>{
      if(Array.isArray(responseJson)){
        alert(responseJson)
      }else{
        alert("pembuatan makam gagal")
      }
    }).then(
      this.setState({
        edit: !this.state.edit
      })
    ).then(
      this.fetchmakam
    ).catch((err)=>{
      this.setState({
        isLoaded: false
      })
      alert("Permintaan tidak dapat diproses")
    })
  }

  handleCreate(){
    
    fetch('http://api.emakam.tujuhlangit.id/api/makam/create?token='+sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_blok: this.state.blokaktif,
        nomor_makam: this.state.nomoraktif,
        kode_makam: this.state.kodeaktif+'-'+this.state.nomoraktif,
        lat:this.state.lat,
        lng:this.state.lng,
      })
    }).then((response)=>response.json())
    .then((responseJson)=>{
      // alert(typeof(responseJson))
      // console.log(responseJson)
      if(Array.isArray(responseJson)){
        alert(responseJson)
      }else{
        alert("pembuatan makam gagal")
      }
    }
    ).then(
      this.setState({
        create:!this.state.create
      })
    ).then(
      this.fetchmakam
    ).catch((err)=>{
      this.setState({
        isLoaded: false
      })
      alert("Permintaan tidak dapat diproses")
    })
  }

  handleDelete(){
    
    fetch('http://api.emakam.tujuhlangit.id/api/makam/delete/'+this.state.idmakamaktif+"?token="+sessionStorage.getItem('token'), {
      method: 'DELETE',
    }).then((response)=>response.json())
    .then((responseJson)=>{
      if(Array.isArray(responseJson)){
        alert(responseJson)
      }else{
        alert("pembuatan makam gagal")
      }
    }).then(
      this.setState({
        small:!this.state.small
      })
    ).then(
      this.fetchmakam
    )
  }

  mapClicked(mapProps, map, event) {
    this.setState({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    })
  }

  handleDeleteEx(){
    
    fetch('http://api.emakam.tujuhlangit.id/api/makam/delete_ex'+"?token="+sessionStorage.getItem('token'), {
      method: 'DELETE',
    }).then(response => response.json())
    .then(
      (result) => {
        console.log(result)
      }).then(
      alert('delete sukses'),
      this.fetchmakam
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

  handleNomor = event => {
    this.setState({ nomoraktif: event.target.value });
  }

  handleBlok = event => {
    var blok=event.target.value.split(',')
    this.setState({ blokaktif: blok[0] , kodeaktif: blok[1]});
  }

  status_penghuni(data){
    var item = this.state.penghuni
    item = item.filter(function(item){
      return item.id_makam.toString().search(data.toString())!== -1
    })
    var status='-'

      item.map((items)=>{
        status=items.status
      })
      

    return status    
  }

  status_terisi(data){
    var item = this.state.penghuni
    var today = moment()

    item = item.filter(function(item){
      return item.id_makam.toString().search(data.id_makam.toString())!== -1
    })

    var status='yellow'
    var ms = today.diff(moment(data.created_at));
    var yearspan= Math.floor(moment.duration(ms).asYears())

    item.map((items)=>{
      status='Terisi'
    })

    if(status=='Terisi'){
      if(yearspan<2){
        return <p style={{color:"red"}}>Terisi</p>
        // status = 'red'
      }else if(yearspan<3)
      {
        return <p style={{color:"grey"}}>Terisi</p>
        // status = 'grey'
      }else{
        return <p style={{color:"green"}}>Terisi</p>
        // status = 'green'
      } 
    }

    return <p style={{color:"yellow"}}>Kosong</p>
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
      idmakamaktif:items.id_makam,
    });
  }

  toggleSmallclose() {
    this.setState({
      small: !this.state.small,
    });
  }

  toggleEdit(items) {
    this.setState({
      edit: !this.state.edit,
      idmakamaktif:items.id_makam,
      nomoraktif:items.nomor_makam,
      kodeaktif:items.kode_blok,
      blokaktif:items.id_blok,
      lng:items.lng,
      lat:items.lat,
    });
  }

  toggleEditclose(){
    this.setState({
      edit: !this.state.edit,
    })
  }

  toggleCreate() {
    this.setState({
      lng:'112.613468',
      lat:'-7.952229',
      create: !this.state.create,
    });
  }

  toggleLocation(items){
    console.log(items)
    this.setState({      
      location: !this.state.location,
      lng:items.lng,
      lat:items.lat,
    })
  }

  toggleLocationClose(){
    this.setState({
      location: !this.state.location,
    })
  }

  static defaultProps = {
    center: {
      lat: -7.952229,
      lng: 112.613468
    },
    zoom: 20
  };

  


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
    }else{
      if (sessionStorage.getItem('login_session') == 1) {
        return (
          <div className="animated fadeIn">
            <Row>
              <Col>
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
                                    <Row>
                                      <Col xs="12">
                                          <Input onChange={this.handleBlok} type="select" name="" id="blok">
                                          <option>Pilih Blok</option>
                                            {this.state.blok.map((items) =>{
                                                return(
                                                  <option value={items.id_blok+','+items.kode_blok} >{items.kode_blok}</option>
                                                )
                                            })
                                            }
                                          </Input><br/>
                                          <Input onChange={this.handleNomor} type="text" id="input1-group3" name="input1-group3" placeholder='Nomor Makam' /><br/>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col style={{
                                          height:'50vh',
                                          width:'5vw'
                                        }}>
                                       <Map 
                                        onClick={this.mapClicked} 
                                        google={this.props.google} 
                                        initialCenter={{lat:this.state.lat,lng:this.state.lng}}
                                        zoom={18}
                                        style={{width:'90%'}}
                                        >

                                         {/* <Polygon
                                          paths={triangleCoords}
                                          strokeColor="#0000FF"
                                          strokeOpacity={0.8}
                                          strokeWeight={2}
                                          fillColor="#0000FF"
                                          fillOpacity={0.35} />  */}

  
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
                                <Button color="primary" onClick={this.handleCreate}>Buat</Button>{' '}
                                <Button color="secondary" onClick={this.toggleCreate}>Batal</Button>
                              </ModalFooter>
                            </Modal>
    
                            <Modal isOpen={this.state.edit} toggle={this.toggleEditclose}
                                  className={'modal-sm ' + this.props.className}>
                              <ModalHeader toggle={this.toggleEditclose}>edit</ModalHeader>
                              <ModalBody>
                                    <Row>
                                      <Col xs="12">
                                        <div className="small text-muted">
                                          <span>Blok / Nomor</span>
                                        </div>
                                      </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                      <Col xs="12">
                                      <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                          <Input onChange={this.handleBlok} type="select" name="blok" id="blok" >
                                            {this.state.blok.map((items) =>{
                                                return(
                                                  <option value={items.id_blok+','+items.kode_blok} selected={items.id_blok==this.state.blokaktif}>{items.kode_blok}</option>
                                                )
                                            })
                                            }
                                          </Input>
                                          </InputGroupAddon>
                                          <Input onChange={this.handleNomor} type="text" id="input1-group3" name="input1-group3" value={this.state.nomoraktif} />
                                      </InputGroup>
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
                                        google={this.props.google} 
                                        initialCenter={{lat:this.state.lat,lng:this.state.lng}}
                                        zoom={18}
                                        style={{width:'90%'}}
                                        >

                                         {/* <Polygon
                                          paths={triangleCoords}
                                          strokeColor="#0000FF"
                                          strokeOpacity={0.8}
                                          strokeWeight={2}
                                          fillColor="#0000FF"
                                          fillOpacity={0.35} />  */}

  
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
                                <Button color="success" onClick={() => this.handleEdit()}>edit</Button>{' '}
                                <Button color="secondary" onClick={this.toggleEditclose}>Cancel</Button>
                              </ModalFooter>
                            </Modal>
    
                            <Modal isOpen={this.state.small} toggle={this.toggleSmallclose}
                                  className={'modal-sm ' + this.props.className}>
                              <ModalHeader toggle={this.toggleSmallclose}></ModalHeader>
                              <ModalBody>
                                    <strong>Menghapus makam akan menghapus seluruh data penghuni makam</strong>
                                    <br/><br/><br/>
                                    <strong>Apakah anda yakin ingin menghapus makam {this.state.idmakamaktif} ?</strong>
                              </ModalBody>
                              <ModalFooter>
                                <Button color="danger" onClick={() => this.handleDelete()}>hapus</Button>
                                <Button color="secondary" onClick={this.toggleSmallclose}>batal</Button>
                              </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.location} toggle={this.toggleLocationClose}
                                  className={'modal-large ' + this.props.className}>
                              <ModalHeader toggle={this.toggleLocation}>Lokasi Makam</ModalHeader>
                              <ModalBody>
                              <div >
                                  <Row>
                                    <Col style={{height:'50vh'}}>
                                      <Map 
                                        google={this.props.google}
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
                <Card>
                  <CardHeader>
                    <Row>
                      <Col col="10" ><strong>Manajemen Makam</strong></Col>
                      <Col col="2" className="text-right">
                        <Button onClick={this.toggleCreate}   outline color="primary">Create</Button>
                        <Button onClick={this.handleDeleteEx}   outline color="primary">Delete Old Data</Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                  <ReactTable
                      data={this.state.items}
                      defaultPageSize={10}
                      filterable
                      columns={[
                        {accessor:'id_makam',show:false},
                        {accessor:'kode_blok',show:false},
                        {accessor:'lat',show:false},
                        {accessor:'lng',show:false},
                        {accessor:'nomor_makam',show:false},
                        {accessor:'created_at',show:false},
                        {
                          Header: 'Nomor Makam', 
                          show:false,
                          // accessor: 'nomor_makam', // String-based value accessors!
                          Cell: row=>(
                            <div>{row.row.nomor_makam}
                            </div>
                          )
                        },
                        {
                          Header: 'Kode Makam',
                          accessor: 'kode_makam', // String-based value accessors!
                          Cell: row=>(
                            <div
                            >{row.row.kode_makam}
                            </div>
                          )
                        },
                        {
                          Header: 'Kode Blok',
                          accessor: 'kode_blok', // String-based value accessors!
                          Cell: row=>(
                            <div>{row.row.kode_blok}
                            </div>
                          )
                        },
                        {
                          Header: 'TPU',
                          accessor: 'nama_tpu', // String-based value accessors!
                          Cell: row=>(
                            <div>{row.row.nama_tpu}
                            </div>
                          )
                        },
                        {
                          Header: "Status Makam",
                          Cell: row=>(
                            <div
                            // style={{
                            //   width: "100%",
                            //   height: "100%",
                            //   backgroundColor:this.status_terisi(row.row),
                            //   borderRadius: "2px",
                            // }}
                            >
                            {this.status_terisi(row.row)}
                            </div>
                          )
                        },
                        {
                          Header: 'Actions',
                          accessor: 'id_blok', // String-based value accessors!
                          filterable:false,
                          Cell: row => (
                            <div>
                              <Row>
                                &emsp;
                                <Button onClick={()=>this.toggleLocation(row.row)}   outline color="primary"><i className="cui-location-pin icons text-left"></i> </Button>
                                &emsp;
                                <Button onClick={()=>this.toggleEdit(row.row)}    outline color="success"><i className="cui-pencil icons text-left"></i> </Button>
                                &emsp;
                                <Button onClick={()=>this.toggleSmall(row.row)}    outline color="danger"><i className="cui-circle-x icons text-left"></i> </Button>
                              <Col col="1"  xl className="">
                              </Col>
                              <Col col="1"  xl className="">
                              </Col>
                              <Col col="1"  xl className="">
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
})(Makam)
