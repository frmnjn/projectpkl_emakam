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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: false,
      large: false,
      modal: false,
      items: [],
      nama: "",
      username: "",
      password: "",
      actor: "",
      activeid: "",
      activename: "",
      activeusername: "",
      activepassword: "",
      activeactor: ""
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);

    fetch('http://localhost:8000/admin/users')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            items: result
          });
        },
    )
  }




  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleLarge(items) {
    this.setState({
      large: !this.state.large
    });
    this.state.activeid = items.id;
    this.state.activename = items.nama;
    this.state.activeusername = items.username;
    this.state.activepassword = items.password;
    this.state.activeactor = items.actor;
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
    console.log(this.state.items);
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

  handledelete(items) {
    fetch('http://localhost:8000/admin/delete_user/' + items.id, {
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

          <Col xl={6}>
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
                    <form className="form-group" onSubmit={this.handleSubmitCreate}>
                      <label>Nama</label>
                      <input type="text" className="form-control" name="nama" onChange={this.handleChange}></input>
                      <label>Username</label>
                      <input type="text" className="form-control" name="username" onChange={this.handleChange}></input>
                      <label>Password</label>
                      <input type="text" className="form-control" name="password" onChange={this.handleChange}></input>
                      <label>actor</label>
                      <input type="text" className="form-control" name="actor" onChange={this.handleChange}></input>
                      <input type="submit" className="form-control btn btn-primary" Value="Submit"></input>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                  </ModalFooter>
                </Modal>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">username</th>
                      <th scope="col">password</th>
                      <th scope="col">actor</th>
                      <th scope="col">edit</th>
                      <th scope="col">delete</th>
                    </tr>
                  </thead>

                  {this.state.items.map((items, index) => {
                    return (
                      <tbody>
                        <th> {items.id} {index.value}</th>
                        <th> {items.nama} </th>
                        <th> {items.username}</th>
                        <th> {items.password}</th>
                        <th> {items.actor}</th>
                        <th><Button color="success" onClick={() => this.toggleLarge(items)} className="mr-1">Edit</Button></th>
                        <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                          className={'modal-Large ' + this.props.className}>
                          <ModalHeader toggle={this.toggleLarge}>Edit User</ModalHeader>
                          <ModalBody>
                            <form className="form-group" onSubmit={this.handleSubmitEdit}>
                              <label>ID</label>
                              <input type="text" className="form-control" name="activeid" onChange={this.handleChange} value={this.state.activeid} disabled></input>
                              <label>nama</label>
                              <input type="text" className="form-control" name="activename" onChange={this.handleChange} value={this.state.activename}></input>
                              <label>Username</label>
                              <input type="text" className="form-control" name="activeusername" onChange={this.handleChange} value={this.state.activeusername}></input>
                              <label>password</label>
                              <input type="text" className="form-control" name="activepassword" onChange={this.handleChange} value={this.state.activepassword}></input>
                              <label>actor</label>
                              <input type="text" className="form-control" name="activeactor" onChange={this.handleChange} value={this.state.activeactor}></input>
                              <input type="submit" className="form-control btn btn-success" Value="Submit"></input>
                            </form>
                          </ModalBody>
                          <ModalFooter>
                          </ModalFooter>
                        </Modal>
                        <th><Button color="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handledelete(items) }} className="mr-1">Delete</Button></th>
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

export default Home;
