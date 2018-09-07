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
  Progress,
  Row,
  Table,
  Modal,
  ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';

import ReactTable from "react-table";
import { RingLoader } from 'react-spinners';

import 'react-table/react-table.css'

class ManajemenPengguna extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      primary: false,
      large: false,
      modal: false,
      items:[],
      table_user: [],
      table_tpu: [],
      table_role_tpu: [],
      nama: "",
      username: "",
      password: "",
      value: "",
      activeid: "",
      activeusername: "",
      activepassword: "",
      activevalue: "",
      activevalueNum: "",
      activetpu: "",
      
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.fetchall = this.fetchall.bind(this);
    this.fetch_role_tpu = this.fetch_role_tpu.bind(this);
    this.fetch_user = this.fetch_user.bind(this);
    this.fetch_tpu = this.fetch_tpu.bind(this);

    this.fetchall()
  }

  fetchall(){
    this.fetch_user()
    this.fetch_tpu()
    this.fetch_role_tpu()
  }

  fetch_user(){
    fetch('http://localhost:8000/api/user/view?token='+sessionStorage.getItem('token'))
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            table_user: result,
            isLoaded:true
          });
        },
    )
  }

  fetch_tpu(){
    fetch('http://localhost:8000/api/tpu/view?token='+sessionStorage.getItem('token'))
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            table_tpu: result
          });
        },
    )
  }

  fetch_role_tpu(){
    fetch('http://localhost:8000/api/role_tpu/view?token='+sessionStorage.getItem('token'))
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            table_role_tpu: result
          });
        },
    )
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleLarge(table_user) {
    this.setState({
      large: !this.state.large
    });
    this.state.activeid = table_user.id_user;
    this.state.activeusername = table_user.username;
    this.state.activepassword = table_user.password;
    this.state.activevalueNum = table_user.role;
    if (table_user.role == 0) {
      this.state.activevalue = "Admin Pusat";
    } else if (table_user.role == 1) {
      this.state.activevalue = "Admin TPU";
    } else if (table_user.role == 2) {
      this.state.activevalue = "Admin Kelurahan";
    } else if (table_user.role == 3) {
      this.state.activevalue = "Kepala UPT Pemakaman";
    } else if (table_user.role == 4) {
      this.state.activevalue = "Kepala Dinas Perkim";
    } else if (table_user.role == 5) {
      this.state.activevalue = "Camat";
    } else {
      this.state.activevalue = "Pengguna";
    } 
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  componentDidMount() {
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangeOption = (e) => {
    this.setState({ value: e.target.value });
  }

  handleChangeOptionActiveValue = (e) => {
    this.setState({ activevalueNum : e.target.value });
  }

  handleSubmitCreate = event => {
    event.preventDefault();
    console.log(this.state.table_user);
    fetch('http://localhost:8000/api/create_user?token='+sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        role: this.state.value
      })
    })
      .then(
        this.fetchall
      )
      .then(
        this.setState({
          primary: !this.state.primary
        })
      );
    //alert("user berhasil ditambahkan!");
  }

  handleSubmitEdit = event => {
    event.preventDefault();
    console.log(this.state.activevalueNum);

    fetch('http://localhost:8000/api/update_user/' + this.state.activeid+"?token="+sessionStorage.getItem('token'), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.activeusername,
        password: this.state.activepassword,
        role: this.state.activevalueNum
      })
    })
    .then(
      this.fetchall
    )
    .then(
      this.setState({
        large : !this.state.large
      })
    );
  }

  handledelete(table_user) {
    fetch('http://localhost:8000/api/delete_user/' + table_user.id_user+"?token="+sessionStorage.getItem('token'), {
      method: 'DELETE'
    })
    .then(
      this.fetchall
    )
  }

  render() {
    if (!this.state.isLoaded) {
      return (<div style={{ display: 'flex', justifyContent: 'center',margin:100 }}>
      <div className='sweet-loading'>
        <RingLoader
          color={'#123abc'}
        />
      </div>
    </div>)
    } else {
    if(sessionStorage.getItem('login_session') == 0){
      return (                   
        <div className="animated fadeIn">
          <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                    className={'modal-primary ' + this.props.className}>
                    <ModalHeader toggle={this.togglePrimary}>Create New User</ModalHeader>
                    <ModalBody>
                      <form onSubmit={this.handleSubmitCreate}>
                        <div class="form-group">
                          <label>Username</label>
                          <input type="text" className="form-control" placeholder="Username" name="username" onChange={this.handleChange}></input>
                        </div>
                        <div class="form-group">
                          <label>Password</label>
                          <input type="text" className="form-control" placeholder="Password" name="password" onChange={this.handleChange}></input>
                        </div>
                        <div class="form-group">
                          <label>Role</label>
                          <select class="form-control" onChange={this.handleChangeOption}>
                            <option>Pilih Role</option>
                            <option value="0">Admin Pusat</option>
                            <option value="1">Admin TPU</option>
                            <option value="2">Kepala UPT</option>
                            <option value="3">Kepala Dinas</option>
                            <option value="4">Kepala Kecamatan</option>
                            <option value="5">Admin Kecamatan</option>
                            <option value="6">Pengguna</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <input type="submit" className="form-control btn btn-primary" Value="Submit"></input>
                        </div>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                  </Modal>
                <Modal isOpen={this.state.large} toggle={this.toggleLarge} className={'modal-Large ' + this.props.className}>
                <ModalHeader toggle={this.toggleLarge}>Edit User</ModalHeader>
                <ModalBody>
                  <form className="form-group" onSubmit={this.handleSubmitEdit}>
                    <div class="form-group">
                      <label>ID User</label>
                      <input type="text" className="form-control" name="activeid" onChange={this.handleChange} value={this.state.activeid} disabled></input>
                    </div>
                    <div class="form-group">
                      <label>Username</label>
                      <input type="text" className="form-control" name="activeusername" onChange={this.handleChange} value={this.state.activeusername}></input>
                    </div>
                    <div class="form-group">
                      <label hidden>Password</label>
                      <input type="text" className="form-control" name="activepassword" onChange={this.handleChange} value={this.state.activepassword} hidden></input>
                    </div>
                    <div class="form-group">
                      <label>Role</label>
                      <select class="form-control"  onChange={this.handleChangeOptionActiveValue}>
                        <option value="0" selected={this.state.activevalueNum==0}>Admin Pusat</option>
                        <option value="1" selected={this.state.activevalueNum==1}>Admin TPU</option>
                        <option value="2" selected={this.state.activevalueNum==2}>Admin Kelurahan</option>
                        <option value="3" selected={this.state.activevalueNum==3}>Kepala UPT Pemakaman</option>
                        <option value="4" selected={this.state.activevalueNum==4}>Kepala Dinas Perkim</option>
                        <option value="5" selected={this.state.activevalueNum==5}>Camat</option>
                        <option value="6" selected={this.state.activevalueNum==6}>Pengguna</option>
                      </select>
                    </div>
                    <input type="submit" className="form-control btn btn-success" Value="Submit"></input>
                  </form>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </Modal> 
  
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <row>
                    <Col col="2" ><strong>Users</strong></Col>
                    <Col col="2" className="text-right">
                      <Button outline color="primary" onClick={this.togglePrimary} className="mr-1">Create</Button>
                    </Col>
                  </row>
                </CardHeader>
                <CardBody>
                <ReactTable
                    data={this.state.table_user}
                    defaultPageSize={10}
                    filterable
                    columns={[
                      {accessor:'id_user',show:false},
                      {accessor:'password',show:false},
                      {
                        Header: 'Username',
                        accessor: 'username', // String-based value accessors!
                      },
                      {
                        Header: 'Role',
                        accessor: 'role', // String-based value accessors!
                      },
                      {
                        Header: 'Actions',
                        filterable:false,
                        Cell: row => (
                          <div>
                            <Button outline color="success" onClick={() => this.toggleLarge(row.row)} className="mr-1">Edit</Button>
                            <Button outline color="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handledelete(row.row) }} className="mr-1">Delete</Button>
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
    } else if(sessionStorage.getItem('login_session') == "1"){
      return(
        <div>
        {alert("Anda tidak memiliki hak akses!")}
        <Redirect to="/login" />
        </div>
      );
    } else {
      return(
        <Redirect to="/404" />
      );
    }
  }
}
}

export default ManajemenPengguna;
