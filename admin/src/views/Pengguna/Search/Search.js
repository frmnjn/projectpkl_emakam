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
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleSmall = this.toggleSmall.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    usersData.id = 7;
    usersData.name = 'fsgr';
    usersData.username = 'fsgr';
    usersData.password = 'fsgr';


    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      error: null,
      isLoaded: true,
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

    fetch("http://localhost:8000/api/penghuni_makam/view_search?token="+sessionStorage.getItem('token'))
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

      fetch("http://localhost:8000/api/blok/view_search?token="+sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            blok: json,
          });
        },
      )
  }

  handlesubmit(items){
    
    fetch('http://localhost:8000/buy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        qty: this.state.formqty,
        name: this.state.activename,
        usr_name: 'Fsgr',
        supplier: this.state.activesupplier,
        
      })
    }).then(
      this.toggleSmall
    )
  }

  handleFormQty = event => {
    this.setState({ formqty: event.target.value });
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

  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }

  toggleSmall(items) {
    this.setState({
      small: !this.state.small,
      activename:items.Name,
      activesupplier:items.Supplier,
      activeqty:items.Qty
    });
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  toggleWarning() {
    this.setState({
      warning: !this.state.warning,
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  toggleInfo() {
    this.setState({
      info: !this.state.info,
    });
  }

  render() {
    // const {isLoaded, items} = this.state;
    if (!this.state.isLoaded) {
      return (<div>loading...</div>)
    }else{
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Manajemen Data Makam
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        <Input onChange={this.blokfilter} type="select" name="blok" id="blok">
                          <option value=''>Semua Blok</option>
                          {
                            this.state.blok.map((items) =>{
                              return(
                                <option value={items.id_blok}>Blok {items.kode_blok} - {items.nama_tpu}</option>
                              )
                            })
                          }
                        </Input>
                        </InputGroupAddon>
                        <Input onChange={this.filterList} type="text" id="input1-group3" name="input1-group3" placeholder="Search" />
                      </InputGroup>
                  </Col>
                </Row>
                <br/>
                <ReactTable
                  data={this.state.showitems}
                  defaultPageSize={10}
                  columns={[
                    {accessor:'nama',show:false},
                    {accessor:'nomor_makam',show:false},
                    {accessor:'nama_ahli_waris',show:false},
                    {accessor:'nik_ahli_waris',show:false},
                    {
                      Header: 'Informasi Makam',
                      accessor: 'id_blok', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <div>Nomor : <strong>{row.row.nomor_makam}</strong></div>
                          <span>Blok |</span> {row.row.id_blok}
                        </div>
                      )
                    },
                    {
                      Header: 'Penghuni Makam',
                      accessor: 'tanggal_wafat', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <div><strong>{row.row.nama}</strong></div>
                          <div className="small text-muted">
                            <span>Tgl Wafat |</span> {row.row.tanggal_wafat}
                          </div>
                        </div>
                      )
                    },
                    {
                      Header: 'Alamat Terakhir',
                      accessor: 'alamat_terakhir', // String-based value accessors!
                      Cell: row => (
                        <div>
                          {row.row.alamat_terakhir}
                        </div>
                      )
                    },
                    {
                      Header: 'Ahli Waris',
                      accessor: 'kontak_ahli_waris', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <div><strong>{row.row.nama_ahli_waris}</strong></div>
                        <div className="small text-muted">
                          <span>Nik |</span> {row.row.nik_ahli_waris}
                        </div>
                        <div className="small text-muted">
                          <span>Kontak |</span> {row.row.kontak_ahli_waris}
                        </div>
                        </div>
                      )
                    },
                    {
                      Header: 'Alamat',
                      accessor: 'alamat_ahli_waris', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <div>{row.row.alamat_ahli_waris}</div>
                        </div>
                      )
                    },
                    {
                      Header: 'Status',
                      accessor: 'status', // String-based value accessors!
                      Cell: row => (
                        <div>
                          <div>{row.row.status}</div>
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
