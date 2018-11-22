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

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


class Makam extends Component {
  constructor(props) {
    super(props);

    
    
    this.toggle = this.toggle.bind(this);
    this.toggleSmall = this.toggleSmall.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.fetchmakam = this.fetchmakam.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      error: null,
      isLoaded: true,
      items: [],
      blok: [],

      activename:null,
      activeqty:null,
      activesupplier:null,

      idmakamaktif:null,
      nomoraktif:null,
      blokaktif:null,
      kodeaktif:null,
      
      formqty:'1',

      
    };

      
  }



  componentDidMount() {
    
    this.fetchmakam()
    
    fetch("http://127.0.0.1:8000/api/blok/view")
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
    fetch("http://127.0.0.1:8000/api/makam/view")
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

  handleEdit(items){
    
    fetch('http://127.0.0.1:8000/api/makam/edit/'+this.state.idmakamaktif, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_blok: this.state.blokaktif,
        nomor_makam: this.state.nomoraktif,
      })
    }).then(
      this.fetchmakam
    ).then(
      ()=>this.toggleEdit(items)
    )
  }

  handleCreate(){
    
    fetch('http://127.0.0.1:8000/api/makam/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_blok: this.state.blokaktif,
        nomor_makam: this.state.nomoraktif,
        kode_makam: this.state.kodeaktif,
      })
    }).then(
      this.fetchmakam
    ).then(
      this.setState({
        create:!this.state.create
      })
    )
  }

  handleDelete(){
    
    fetch('http://127.0.0.1:8000/api/makam/delete/'+this.state.idmakamaktif, {
      method: 'DELETE',
    }).then(
      this.fetchmakam
    ).then(
      this.setState({
        small:!this.state.small
      })
    )
  }

  
  handleKode = event => {
    this.setState({ kodeaktif: event.target.value });
  }

  handleNomor = event => {
    this.setState({ nomoraktif: event.target.value });
  }

  handleBlok = event => {
    this.setState({ blokaktif: event.target.value });
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

  toggleEdit(items) {
    this.setState({
      edit: !this.state.edit,
      idmakamaktif:items.id_makam,
      nomoraktif:items.nomor_makam,
      blokaktif:items.id_blok,
    });
  }

  toggleCreate() {
    this.setState({
      create: !this.state.create,
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
                <Row>
                  <Col col="10" ><strong>Manajemen Makam</strong></Col>
                  <Col col="2" className="text-right">
                    <Button onClick={this.toggleCreate}   outline color="primary">Create</Button>
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
                                      <Input onChange={this.handleBlok} type="select" name="blok" id="blok">
                                      <option>Pilih Blok</option>
                                        {this.state.blok.map((items) =>{
                                            return(
                                              <option value={items.id_blok}>blok {items.kode_blok}</option>
                                            )
                                        })
                                        }
                                      </Input><br/>
                                      <Input onChange={this.handleNomor} type="text" id="input1-group3" name="input1-group3" placeholder='Nomor Makam' /><br/>
                                      <Input onChange={this.handleKode} type="text" id="input1-group3" name="input1-group3" placeholder='Kode Makam' />
                                  </Col>
                                </Row>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={this.handleCreate}>Buat</Button>{' '}
                            <Button color="secondary" onClick={this.toggleCreate}>Batal</Button>
                          </ModalFooter>
                        </Modal>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th>ID User</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th className="text-center">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.items.map((items) =>{
                  return (
                    <tr key={items.id_makam} >
                    <td>
                      <div>
                        {items.nomor_makam}
                      </div>
                    </td>
                    <td>
                      <div>{items.kode_makam}</div>
                    </td>
                    <td>
                      <div>{items.nama_tpu} | blok {items.kode_blok}</div>
                    </td>
                    <td>
                      <Row>
                      <Col col="2"  xl className="mb-1 mb-xl-0">
                        <Button onClick={()=>this.toggleEdit(items)}   block outline color="success"><i className="cui-pencil icons text-left"></i> Ubah</Button>
                        <Modal isOpen={this.state.edit} toggle={()=>this.toggleEdit(items)}
                              className={'modal-sm ' + this.props.className}>
                          <ModalHeader toggle={()=>this.toggleEdit(items)}>edit</ModalHeader>
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
                                      <Input onChange={this.handleBlok} type="select" name="blok" id="blok">
                                        <option value={this.state.blokaktif}>blok {this.state.blokaktif}</option>
                                        {this.state.blok.map((items) =>{
                                          if (items.id_blok!=this.state.blokaktif){
                                            return(
                                              <option value={items.id_blok}>blok {items.kode_blok}</option>
                                            )
                                          }
                                        })
                                        }
                                      </Input>
                                      </InputGroupAddon>
                                      <Input onChange={this.handleNomor} type="text" id="input1-group3" name="input1-group3" value={this.state.nomoraktif} />
                                  </InputGroup>
                                  </Col>
                                </Row>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="success" onClick={() => this.handleEdit(items)}>edit</Button>{' '}
                            <Button color="secondary" onClick={()=>this.toggleEdit(items)}>Cancel</Button>
                          </ModalFooter>
                        </Modal>
                      </Col>
                      <Col col="2"  xl className="mb-1 mb-xl-0">
                        <Button onClick={()=>this.toggleSmall(items)}   block outline color="danger"><i className="cui-circle-x icons text-left"></i> Hapus</Button>
                        <Modal isOpen={this.state.small} toggle={this.toggleSmall}
                              className={'modal-sm ' + this.props.className}>
                          <ModalHeader toggle={this.toggleSmall}></ModalHeader>
                          <ModalBody>
                                <strong>Menghapus makam akan menghapus seluruh data penghuni makam</strong>
                                <br/><br/><br/>
                                <strong>Apakah anda yakin ingin menghapus makam {this.state.idmakamaktif} ?</strong>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="danger" onClick={() => this.handleDelete()}>hapus</Button>{' '}
                            <Button color="secondary" onClick={this.toggleSmall}>batal</Button>
                          </ModalFooter>
                        </Modal>
                      </Col>
                      </Row>
                    </td>
                  </tr>
                  )
                      } 
                    )
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
  }
}
class unauthorized extends Component{
  render(){
    alert("Anda tidak memiliki hak akses!");
    return(
      <p></p>
    );
  } 
}
const logger = sessionStorage.getItem('login_session') == "1" ? Makam : unauthorized;

export default logger;
//export default Makam;
