import React, { Component } from 'react';
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
      activetpu: ""
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
    fetch('http://localhost:8000/api/create_user', {
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
    }).catch((error) => {
      console.error(error);
    });
    alert("user berhasil ditambahkan!");
  }

  handleSubmitEdit = event => {
    event.preventDefault();
    console.log(this.state.activevalueNum);

    fetch('http://localhost:8000/api/update_user/' + this.state.activeid, {
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
    alert("Data user dengan id " + this.state.activeid + " berhasil di update!");
  }

  handledelete(table_user) {
    fetch('http://localhost:8000/api/delete_user/' + table_user.id_user, {
      method: 'DELETE'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      alert(myJson.msg);
    });
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
                          <option value="0">Admin Pusat</option>
                          <option value="1">Admin TPU</option>
                          <option value="2">Admin Kelurahan</option>
                          <option value="3">Kepala UPT Pemakaman</option>
                          <option value="3">Kepala Dinas Perkim</option>
                          <option value="4">Camat</option>
                          <option value="5">Pengguna</option>
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
                                  <select class="form-control" value={this.state.activevalue} onChange={this.handleChangeOptionActiveValue}>
                                    <option value={this.state.activevalueNum}>{this.state.activevalue}</option>
                                    <option value="0">Admin Pusat</option>
                                    <option value="1">Admin TPU</option>
                                    <option value="2">Admin Kelurahan</option>
                                    <option value="3">Kepala UPT Pemakaman</option>
                                    <option value="3">Kepala Dinas Perkim</option>
                                    <option value="4">Camat</option>
                                    <option value="5">Pengguna</option>
                                  </select>
                                  {/* <select class="form-control" name="role_tpu">
                                  {this.state.table_role_tpu.map((table_role_tpu, index) => {
                                    return (
                                      <option>{table_role_tpu.id_role_tpu}</option>
                                    )
                                  })}

                                </select> */}
                                </div>
                                {/* <div class="form-group">
                                <label>TPU</label>
                                <select class="form-control" name="role_tpu">
                                  {this.state.table_tpu.map((table_tpu, index) => {
                                    return (
                                      <option>{table_tpu.id_tpu} - {table_tpu.nama_tpu}</option>
                                    )
                                  })}

                                </select>
                              </div> */}
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
