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
      
    };

      
  }

  blokfilter =event=>{
    var updatedList = this.state.items;
    this.setState({blokfilter:false})
    if (event.target.value!=''){
      this.setState({
        blokfilter:true
      })
      updatedList = updatedList.filter(function(item){
        return item.id_blok.toString().search(event.target.value.toString())!== -1
      })
    }
    this.setState({showitems: updatedList,itemblokfilter: updatedList});
  }

  filterList =event=>{
    var updatedList;
    if(this.state.blokfilter){
      updatedList = this.state.itemblokfilter;
    }else{
      updatedList = this.state.items;
    }
    
    if (event.target.value!=''){
      updatedList = updatedList.filter(function(item){
        return item.nama.toLowerCase().search(
          event.target.value.toLowerCase())!== -1||
          item.nama_ahli_waris.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1||
          item.nik_ahli_waris.toString().search(
            event.target.value.toLowerCase()) !== -1||
          item.alamat_ahli_waris.toString().toLowerCase().search(
            event.target.value.toLowerCase()) !== -1||
          item.alamat_terakhir.toString().toLowerCase().search(
            event.target.value.toLowerCase()) !== -1||
          item.nomor_makam.toString().search(
            event.target.value.toLowerCase()) !== -1;
      });
    }
    this.setState({showitems: updatedList});
  }

  componentDidMount() {

    fetch("http://localhost:8000/api/dokumen/view?token="+sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            items: json,
            showitems: json
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

  toggleclose() {
    this.setState({
      modal: !this.state.modal,
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
                  <Modal isOpen={this.state.modal} toggle={this.toggleclose}
                    className={'modal-Large ' + this.props.className}>
                    <ModalHeader toggle={this.toggleclose}>Lihat Data Penghuni Makam</ModalHeader>
                    <ModalBody>
                      <form className="form-group" onSubmit=''>
                        <label>Nama Penghuni Makam</label>
                        <input type="text" className="form-control" name="activenama"  value={this.state.activedata.nama} disabled></input>
                        <label>Alamat Terakhir</label>
                        <input type="text" className="form-control" name="activealamat_terakhir"  value={this.state.activedata.alamat_terakhir} disabled></input>
                        <label>Tanggal Wafat</label>
                        <input type="text" className="form-control" name="activetanggal_wafat"  value={this.state.activedata.tanggal_wafat} disabled></input>
                        <label>Status</label>
                        <input type="text" className="form-control" name="activestatus" value={this.state.activedata.status} disabled></input>
                        <label>Nomor Makam</label>
                        <input type="text" className="form-control" name="activeid_makam"  value={this.state.activedata.nomor_makam} disabled></input>
                        <label>Nama Ahli Waris</label>
                        <input type="text" className="form-control" name="activenama_ahli_waris" value={this.state.activedata.nama_ahli_waris} disabled></input>
                        <label>Alamat Ahli Waris</label>
                        <input type="text" className="form-control" name="activealamat_ahli_waris"  value={this.state.activedata.alamat_ahli_waris} disabled></input>
                        <label>NIK Ahli Waris</label>
                        <input type="text" className="form-control" name="activenik_ahli_waris" value={this.state.activedata.nik_ahli_waris} disabled></input>
                        <label>Kontak Ahli Waris</label>
                        <input type="text" className="form-control" name="activekontak_ahli_waris"  value={this.state.activedata.kontak_ahli_waris} disabled></input>
                      </form>
                    </ModalBody>
                  </Modal>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Manajemen Data Makam
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
                      accessor: 'ktp', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <Button color="info" onClick={()=>this.toggle(row.row)} className="mr-1">View</Button>
                        </div>
                      )
                    },
                    {
                      Header: 'KK Almarhum',
                      accessor: 'kk', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <Button color="info" onClick={()=>this.toggle(row.row)} className="mr-1">View</Button>
                        </div>
                      )
                    },
                    {
                      Header: 'KK Almarhum',
                      accessor: 'kk', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <Button color="info" onClick={()=>this.toggle(row.row)} className="mr-1">View</Button>
                        </div>
                      )
                    },
                    {
                      Header: 'Actions',
                      accessor: 'status', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <Button color="info" onClick={()=>this.toggle(row.row)} className="mr-1">Accept</Button>
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
