import React, { Component } from 'react';
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

import 'react-table/react-table.css'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



class Search extends Component {
  constructor(props) {
    super(props);

    
    
    this.toggle = this.toggle.bind(this);
    this.toggleclose = this.toggleclose.bind(this);
    this.modalkkclose = this.modalkkclose.bind(this);
    this.modalktpclose = this.modalktpclose.bind(this);
    this.toggleproggress = this.toggleproggress.bind(this);
    this.proggress = this.proggress.bind(this);
    
    this.update_status = this.update_status.bind(this);
    this.acc_kec = this.acc_kec.bind(this);
    this.acc_dinas = this.acc_dinas.bind(this);
    this.acc_kupt = this.acc_kupt.bind(this);
    this.cek_kelengkapan = this.cek_kelengkapan.bind(this);

    usersData.id = 7;
    usersData.name = 'fsgr';
    usersData.username = 'fsgr';
    usersData.password = 'fsgr';


    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      error: null,
      isLoaded: false,
      isFiltered: true,
      filter_keyword:'',
      items: [],
      showitems:[],
      itemsperblok:[],
      blok:[],
      blokfilter:false,
      itemblokfilter:[],
      activename:null,
      activeqty:null,
      activesupplier:null,
      formqty:'1',

      activedata:[],
      activektp:null,
      activekk:null,
      
    };

      
  }

  proggress(status){

    return status=="Menunggu Persetujuan Kepala UPT" ? 25: 
            status=="Menunggu Persetujuan Kepala Dinas" ? 50:
            status=="Menunggu Persetujuan Kepala Kecamatan" ? 75:
            status=="Proses Selesai" ? 100:0

  }

  update_status(id,newstatus){
    fetch('http://localhost:8000/api/dokumen/update?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:id,
        status: newstatus
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        alert('responseJson');
      })
  }

  acc_kec(id){
    var status = 'Proses Selesai'
    this.update_status(id,status)
  }

  acc_dinas(id){
    var status = 'Menunggu Persetujuan Kepala Kecamatan'
    this.update_status(id,status)
  }

  acc_kupt(id){
    var status = 'Menunggu Persetujuan Kepala Dinas'
    this.update_status(id,status)
  }

  cek_kelengkapan(id){
    fetch('http://localhost:8000/api/dokumen/update?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:id,
        kelengkapan_dokumen:'Lengkap'
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
      })
  }

  componentDidMount() {
    
    fetch("http://localhost:8000/api/dokumen/view?token="+sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {

          if (sessionStorage.getItem('login_session') == "2") {
            var updateitem;
            updateitem = json;
            updateitem = updateitem.filter(function(item){
              return item.kelengkapan_dokumen.toLowerCase().search("lengkap") !== -1&&
              item.status.toLowerCase().search("menunggu persetujuan kepala upt") !== -1;
            });
            this.setState({showitems: updateitem});
          }else if (sessionStorage.getItem('login_session') == "3") {
            var updateitem;
            updateitem = json;
            updateitem = updateitem.filter(function(item){
              return item.kelengkapan_dokumen.toLowerCase().search("lengkap") !== -1&&
              item.status.toLowerCase().search("menunggu persetujuan kepala dinas") !== -1;
            });
            this.setState({showitems: updateitem});
          }else if (sessionStorage.getItem('login_session') == "4") {
            var updateitem;
            updateitem = json;
            updateitem = updateitem.filter(function(item){
              return item.kelengkapan_dokumen.toLowerCase().search("lengkap") !== -1&&
              item.status.toLowerCase().search("menunggu persetujuan kepala kecamatan") !== -1;
            });
            this.setState({showitems: updateitem});
          }else{
            this.setState({showitems: json});
          }



          this.setState({
            isLoaded: true,
            items: json,
          });
        },
      )
      
    // fetch("http://localhost:8000/api/penghuni_makam/view_search?token="+sessionStorage.getItem('token'))
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(
    //     (json) => {
    //       this.setState({
    //         isLoaded: true,
    //         items: json,
    //         showitems: json
    //       });
    //     },
    //   )

    //   fetch("http://localhost:8000/api/blok/view_search?token="+sessionStorage.getItem('token'))
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(
    //     (json) => {
    //       this.setState({
    //         blok: json,
    //       });
    //     },
    //   )
  }


  toggle(items) {
    this.setState({
      activedata: items,
      modal: !this.state.modal,
    });
  }

  modalkk(items){
    this.setState({
      activekk: items.file_kk.substring(6),
      kkmodal: !this.state.kkmodal,
    })
  }

  modalktp(items){
    this.setState({
      activektp: items.file_ktp.substring(6),
      ktpmodal: !this.state.ktpmodal,
    })
  }

  modalkkclose(){
    this.setState({
      kkmodal: !this.state.kkmodal,
    });
  }
  modalktpclose(){
    this.setState({
      ktpmodal: !this.state.ktpmodal,
    });
  }

  toggleclose() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleproggress(){
    this.setState({
      modalprogress: !this.state.modalprogress,
    });
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
    }else{
    return (
      <div className="animated fadeIn">
                  <Modal isOpen={this.state.modal} toggle={this.toggleclose}className={'modal-Large ' + this.props.className}>
                    <ModalHeader toggle={this.toggleclose}>Lihat Data Penghuni Makam</ModalHeader>
                    <ModalBody>
                      <form className="form-group" onSubmit=''>
                        <label>Nama Penghuni Makam</label>
                        <input type="text" className="form-control" name="activenama"  value={this.state.activedata.nama} disabled></input>
                        <label>Alamat Terakhir</label>
                      </form>
                    </ModalBody>
                  </Modal>
                  <Modal isOpen={this.state.ktpmodal} toggle={this.modalktpclose} className={'modal-Large ' + this.props.className}>
                    <ModalHeader toggle={this.modalktpclose}>KTP</ModalHeader>
                    <ModalBody>
                      <img src={"http://localhost:8000/storage"+this.state.activektp} class="img-fluid" alt="Responsive image"></img>
                    </ModalBody>
                  </Modal>
                  <Modal isOpen={this.state.kkmodal} toggle={this.modalkkclose} className={'modal-Large ' + this.props.className}>
                    <ModalHeader toggle={this.modalkkclose}>KTP</ModalHeader>
                    <ModalBody>
                      <img src={"http://localhost:8000/storage"+this.state.activekk} class="img-fluid" alt="Responsive image"></img>
                    </ModalBody>
                  </Modal>
                  <Modal isOpen={this.state.modalprogress} toggle={this.toggleproggress} className={'modal-Large ' + this.props.className}>
                    <ModalHeader toggle={this.toggleproggress}>Progress Tracking</ModalHeader>
                    <ModalBody>
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
                  columns={[                    
                    {accessor:'id',show:false},
                    {accessor:'nama_almarhum',show:false},
                    {accessor:'nik_ahli_waris',show:false},                    
                    {
                      Header: 'Nama Almarhum',
                      accessor: 'nama_almarhum', // String-based value accessors!
                    },
                    {
                      Header: 'Nama Pewaris',
                      accessor: 'nama_pewaris', // String-based value accessors!
                    },
                    {
                      Header: 'KTP Almarhum',
                      accessor: 'file_ktp', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <Button color="info" onClick={()=>this.modalktp(row.row)} className="mr-1">View</Button>
                        </div>
                      )
                    },
                    {
                      Header: 'KK Almarhum',
                      accessor: 'file_kk', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <Button color="info" onClick={()=>this.modalkk(row.row)} className="mr-1">View</Button>
                        </div>
                      )
                    },
                    {
                      Header: 'Kelengkapan Dokumen',
                      accessor: 'kelengkapan_dokumen', // String-based value accessors!

                    },
                    {
                      Header: 'Status',
                      accessor: 'status', // String-based value accessors!
                    },
                    {
                      Header: 'Track Proggression',
                      Cell: row => (
                        <div>
                          <div className="text-center">{this.proggress(row.row.status)}%</div>
                          <Progress value={this.proggress(row.row.status)} />
                        </div>
                      )
                    },
                    {
                      Header: 'Actions kp.kecamatan',
                      accessor: 'status', // String-based value accessors!
                      show:sessionStorage.getItem('login_session') == "4" ? true:false,
                      Cell: row => (
                        <div>
                          <Button color="info" onClick={()=>this.acc_kec(row.row.id)} className="mr-1">Accept</Button>
                        </div>
                      )
                    },
                    {
                      Header: 'Actions',
                      accessor: 'status', // String-based value accessors!
                      show:sessionStorage.getItem('login_session') == "3" ? true:false,
                      Cell: row => (
                        <div>
                          <Button color="info" onClick={()=>this.acc_dinas(row.row.id)} className="mr-1">Accept</Button>
                        </div>
                      )
                    },
                    {
                      Header: 'Actions',
                      accessor: 'status', // String-based value accessors!
                      show:sessionStorage.getItem('login_session') == "2" ? true:false,
                      Cell: row => (
                        <div>
                          <Button color="info" onClick={()=>this.acc_kupt(row.row.id)} className="mr-1">Accept</Button>
                        </div>
                      )
                    },
                    {
                      Header: 'Actions',
                      show:sessionStorage.getItem('login_session') == "1" ? true:false,
                      accessor: 'status', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <Button color="info" onClick={()=>this.cek_kelengkapan(row.row.id)} className="mr-1">Accept</Button>
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
