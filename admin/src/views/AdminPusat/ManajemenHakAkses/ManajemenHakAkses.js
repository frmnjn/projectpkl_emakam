import React, { Component } from 'react';
import axios from 'axios';
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

class ManajemenHakAkses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: false,
      large: false,
      modal: false,
      table_user: [],
      table_tpu: [],
      table_role_tpu: [],
      table_constraint_user: [],
      id_tpu: "",
      id_user: "",
      value_tpu: "",
      value_user: "",
      activevalue_tpu: "",
      activevalue_user: "",
      activeid_tpu: "",
      activeid_user: "",
      activenama_tpu: "",
      activeusername: "",
      activeid_role_tpu: ""
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);

    fetch('http://localhost:8000/api/user/view')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            table_user: result
          });
        },
    )

    fetch('http://localhost:8000/api/tpu/view')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            table_tpu: result
          });
        },
    )

    fetch('http://localhost:8000/api/role_tpu/view')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            table_role_tpu: result
          });
        },
    )
    fetch('http://localhost:8000/api/constraint_user')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            table_constraint_user: result
          });
        },
    )
  }





  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleLarge(table_constraint_user) {
    this.setState({
      large: !this.state.large
    });
    this.state.activeid_tpu = table_constraint_user.id_tpu;
    this.state.activenama_tpu = table_constraint_user.nama_tpu;
    this.state.activeid_user = table_constraint_user.id_user;
    this.state.activeusername = table_constraint_user.username;
    this.state.activeid_role_tpu = table_constraint_user.id_role_tpu;

  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmitCreate = event => {
    event.preventDefault();
    console.log(this.state.value_user);
    fetch('http://localhost:8000/api/create_role_tpu', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_tpu: this.state.value_tpu,
        id_user: this.state.value_user
      })
    }).catch((error) => {
      console.error(error);
    });
    alert("user berhasil ditambahkan!");
  }

  handleSubmitEdit = event => {
    event.preventDefault();
    console.log(this.state.activevalue_tpu);
    console.log(this.state.activevalue_user);

    fetch('http://localhost:8000/api/update_role_tpu/' + this.state.activeid_user, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_tpu: this.state.activevalue_tpu,
        id_user: this.state.activevalue_user,
      })
    }).then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      alert(myJson.msg);
    });
  }

  handledelete(table_constraint_user) {
    fetch('http://localhost:8000/api/delete_role_tpu/' + table_constraint_user.id_user, {
      method: 'DELETE'
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        alert(myJson.msg);
      });
  }

  handleChangeOption_tpu = (e) => {
    this.setState({ value_tpu: e.target.value });
  }

  handleChangeOption_user = (e) => {
    this.setState({ value_user: e.target.value });
  }

  handleChangeOption_active_tpu = (e) => {
    this.setState({ activevalue_tpu: e.target.value });
  }

  handleChangeOption_active_user = (e) => {
    this.setState({ activevalue_user: e.target.value });
  }

  render() {
    return (

      <div className="animated fadeIn">
        <Row>

          <Col xl={12}>
            <Card>
              <CardHeader>
                Users
              </CardHeader>
              <CardBody>
                <Button color="primary" onClick={this.togglePrimary} className="mr-1">Create</Button>
                <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                  className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.togglePrimary}>Buat Hak Akses</ModalHeader>
                  <ModalBody>
                    <form onSubmit={this.handleSubmitCreate}>
                      <div class="form-group">
                        <label>ID TPU</label>
                        <select class="form-control" onChange={this.handleChangeOption_tpu}>
                          <option disabled selected>ID TPU</option>
                          {this.state.table_tpu.map((table_tpu, index) => {
                            return (
                              <option value={table_tpu.id_tpu} >{table_tpu.id_tpu} - {table_tpu.nama_tpu}</option>
                            )
                          })}
                        </select>
                      </div>
                      <div class="form-group">
                        <label>ID User</label>
                        <select class="form-control" onChange={this.handleChangeOption_user}>
                          <option disabled selected>ID User</option>
                          {this.state.table_user.map((table_user, index) => {
                            return (
                              <option value={table_user.id_user} >{table_user.id_user} - {table_user.username}</option>
                            )
                          })}
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
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID Role TPU</th>
                      <th scope="col">TPU</th>
                      <th scope="col">User</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  {this.state.table_constraint_user.map((table_constraint_user, index) => {
                    return (
                      <tbody>
                        <th> {table_constraint_user.id_role_tpu}</th>
                        <th> {table_constraint_user.id_tpu} - {table_constraint_user.nama_tpu}</th>
                        <th> {table_constraint_user.id_user} - {table_constraint_user.username}</th>
                        <th><Button color="success" onClick={() => this.toggleLarge(table_constraint_user)} className="mr-1">Edit</Button>
                          <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                            className={'modal-Large ' + this.props.className}>
                            <ModalHeader toggle={this.toggleLarge}>Edit User</ModalHeader>
                            <ModalBody>
                              <form className="form-group" onSubmit={this.handleSubmitEdit}>
                                <div class="form-group">
                                  <label>ID Role User</label>
                                  <input type="number" className="form-control" name="activeid_role_tpu" onChange={this.handleChange} value={this.state.activeid_role_tpu}></input>
                                </div>
                                <div class="form-group">
                                  <label>ID TPU</label>
                                  <select class="form-control" onChange={this.handleChangeOption_active_tpu}>
                                    <option disabled selected>Pilih ID TPU</option>
                                    {this.state.table_tpu.map((table_tpu, index) => {
                                      return (
                                        <option value={table_tpu.id_tpu} >{table_tpu.id_tpu} - {table_tpu.nama_tpu}</option>
                                      )
                                    })}
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label>ID User</label>
                                  <select class="form-control" onChange={this.handleChangeOption_active_user}>
                                  <option disabled selected>Pilih ID User</option>
                                    {this.state.table_user.map((table_user, index) => {
                                      return (
                                        <option value={table_user.id_user} >{table_user.id_user} - {table_user.username}</option>
                                      )
                                    })}
                                  </select>
                                </div>
                                <input type="submit" className="form-control btn btn-success" Value="Submit"></input>
                              </form>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                          </Modal>
                          <Button color="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handledelete(table_constraint_user) }} className="mr-1">Delete</Button></th>
                      </tbody>
                    )
                  })}

                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
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
const logger = sessionStorage.getItem('login_session') == "0" ? ManajemenHakAkses : unauthorized;

export default logger;
