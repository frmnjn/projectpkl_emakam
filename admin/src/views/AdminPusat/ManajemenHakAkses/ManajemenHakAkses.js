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

class ManajemenPengguna extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: false,
      large: false,
      modal: false,
      table_user: [],
      table_tpu: [],
      table_role_tpu: [],
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
    this.state.activerole = table_user.role;
    this.state.activetpu = table_user.id_tpu;
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

  handleSubmitCreate = event => {
    event.preventDefault();
    console.log(this.state.table_user);
    fetch('http://localhost:8000/admin/create_user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: this.state.nama,
        username: this.state.username,
        password: this.state.password,
        actor: this.state.actor
      })
    }).catch((error) => {
      console.error(error);
    });
    alert("user berhasil ditambahkan!");
  }

  handleSubmitEdit = event => {
    event.preventDefault();

    fetch('http://localhost:8000/admin/edit_user/' + this.state.activeid, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: this.state.activename,
        username: this.state.activeusername,
        password: this.state.activepassword,
        actor: this.state.activeactor
      })
    })
    alert("Data user dengan id " + this.state.activeid + " berhasil di update!");
  }

  handledelete(table_user) {
    fetch('http://localhost:8000/api/delete_user/' + table_user.id_user, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    alert("Data user dengan id " + this.state.activeid + " berhasil di hapus!");
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
                  <ModalHeader toggle={this.togglePrimary}>Create New User</ModalHeader>
                  <ModalBody>
                    <form onSubmit={this.handleSubmitCreate}>
                      <div class="form-group">
                        <label>ID User</label>
                        <input type="text" className="form-control" placeholder="ID User" name="id_user" onChange={this.handleChange}></input>

                      </div>
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
                        <select class="form-control" name="role_tpu">
                          {this.state.table_role_tpu.map((table_role_tpu, index) => {
                            return (
                              <option>{table_role_tpu.id_role_tpu}</option>
                            )
                          })}

                        </select>
                      </div>
                      <div class="form-group">
                        <label>ID TPU</label>
                        <select class="form-control" name="id_tpu">
                          {this.state.table_tpu.map((table_tpu, index) => {
                            return (
                              <option>{table_tpu.id_tpu} - {table_tpu.nama_tpu}</option>
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
                      <th scope="col">ID User</th>
                      <th scope="col">Username</th>
                      <th scope="col">Password</th>
                      <th scope="col">Role</th>
                      <th scope="col">TPU</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  {this.state.table_user.map((table_user, index) => {
                    return (
                      <tbody>
                        <th> {table_user.id_user}</th>
                        <th> {table_user.username}</th>
                        <th> {table_user.password}</th>
                        <th> {table_user.role}</th>
                        <th> {table_user.id_tpu} </th>
                        <th><Button color="success" onClick={() => this.toggleLarge(table_user)} className="mr-1">Edit</Button>
                        <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                          className={'modal-Large ' + this.props.className}>
                          <ModalHeader toggle={this.toggleLarge}>Edit User</ModalHeader>
                          <ModalBody>
                            <form className="form-group" onSubmit={this.handleSubmitEdit}>
                              <div class="form-group">
                                <label>ID User</label>
                                <input type="text" className="form-control" name="activeid" onChange={this.handleChange} value={this.state.activeid}></input>
                              </div>
                              <div class="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" name="activeusername" onChange={this.handleChange} value={this.state.activeusername}></input>
                              </div>
                              <div class="form-group">
                                <label>Password</label>
                                <input type="text" className="form-control" name="activepassword" onChange={this.handleChange} value={this.state.activepassword}></input>
                              </div>
                              <div class="form-group">
                                <label>Role</label>
                                <select class="form-control" name="role_tpu">
                                  {this.state.table_role_tpu.map((table_role_tpu, index) => {
                                    return (
                                      <option>{table_role_tpu.id_role_tpu}</option>
                                    )
                                  })}

                                </select>
                              </div>
                              <div class="form-group">
                                <label>TPU</label>
                                <select class="form-control" name="role_tpu">
                                  {this.state.table_tpu.map((table_tpu, index) => {
                                    return (
                                      <option>{table_tpu.id_tpu} - {table_tpu.nama_tpu}</option>
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
                        <Button color="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handledelete(table_user) }} className="mr-1">Delete</Button></th>
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

export default ManajemenPengguna;
