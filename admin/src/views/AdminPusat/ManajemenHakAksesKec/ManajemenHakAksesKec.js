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

class ManajemenHakAksesKec extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: false,
      large: false,
      modal: false,
      isLoaded: false,
      table_user: [],
      table_kecamatan: [],
      table_constraint_user: [],
      table_validation: [],
      id_kecamatan: "",
      id_user: "",
      value_kecamatan: "",
      value_user: "",
      activevalue_kecamatan: "",
      activevalue_user: "",
      activeid_kecamatan: "",
      activeid_user: "",
      activenama: "",
      activeusername: "",
      active_id_role: ""
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.fetchall = this.fetchall.bind(this);


  }

  componentDidMount() {

    this.fetchall()

  }


  fetchall() {

    fetch('http://api.emakam.tujuhlangit.id/api/user/view?token=' + sessionStorage.getItem('token'))
      .then(response => response.json())
      .then(
        (result) => {
            result = result.filter(function (item) {
              return item.role.toString().search('4') !== -1||
              item.role.toString().search('5') !== -1;
          })
          this.setState({
            table_user: result
          })   
    })


    fetch('http://api.emakam.tujuhlangit.id/api/kecamatan/viewall?token=' + sessionStorage.getItem('token'))
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            table_kecamatan: result
          });
        },
    )

    fetch('http://api.emakam.tujuhlangit.id/api/kecamatan/constraint_user?token=' + sessionStorage.getItem('token'))
      .then(response => response.json())
      .then(
        (result) => {
          // result = result.filter(function (item) {
          //   return item.role.toString().search('4') !== -1||
          //   item.role.toString().search('5') !== -1;
          // })
          this.setState({
            table_constraint_user: result,
            isLoaded: true
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

    this.state.activevalue_kecamatan = table_constraint_user.id_kecamatan,
      this.state.activevalue_user = table_constraint_user.id_user,
      this.state.activeid_kecamatan = table_constraint_user.id_kecamatan,
      this.state.activenama = table_constraint_user.nama,
      this.state.activeid_user = table_constraint_user.id_user,
      this.state.activeusername = table_constraint_user.username,
      this.state.active_id_role = table_constraint_user.id_role,
      // alert(this.state.active_id_role_tpu);
      this.setState({
        large: !this.state.large,
      });
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
    fetch('http://api.emakam.tujuhlangit.id/api/kecamatan/create_role?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_kecamatan: this.state.value_kecamatan,
        id_user: this.state.value_user
      })
    }).then(
      this.fetchall
    )
      .then(
        this.setState({
          primary: !this.state.primary
        }),
        alert('update sukses'),
      ).catch((err)=>{
        this.setState({
          isLoaded: false
        })
        alert("Permintaan tidak dapat diproses")
      })
  }

  handleSubmitEdit = event => {
    
      fetch('http://api.emakam.tujuhlangit.id/api/kecamatan/update_role/' + this.state.active_id_role + "?token=" + sessionStorage.getItem('token'), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_kecamatan: this.state.activevalue_kecamatan,
          id_user: this.state.activevalue_user,
        })
      }).then(
        this.fetchall
      )
        .then(
          this.setState({
            large: !this.state.large
          }),
          alert("Update sukses"),

        ).catch((err)=>{
          this.setState({
            isLoaded: false
          })
          alert("Permintaan tidak dapat diproses")
        })
    
  }

  handledelete(table_constraint_user) {
    console.log(table_constraint_user);
    fetch('http://api.emakam.tujuhlangit.id/api/kecamatan/delete_role/' + table_constraint_user.id_role + "?token=" + sessionStorage.getItem('token'), {
      method: 'DELETE'
    })
      .then(
        this.fetchall
      )
      .then(function () {
        alert("Hak Akses Berhasil dihapus!");
      }).catch((err)=>{
        this.setState({
          isLoaded: false
        })
        alert("Permintaan tidak dapat diproses")
      })
  }

  handleChangeOption_kecamatan = (e) => {
    this.setState({ value_kecamatan: e.target.value });
  }

  handleChangeOption_user = (e) => {
    this.setState({ value_user: e.target.value });
  }

  handleChangeOption_active_kecamatan = (e) => {
    this.setState({ activevalue_kecamatan: e.target.value });
  }

  handleChangeOption_active_user = (e) => {
    this.setState({ activevalue_user: e.target.value });
  }




  render() {
    if (!this.state.isLoaded) {
      return (<div style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
        <div className='sweet-loading'>
          <RingLoader
            color={'#123abc'}
          />
        </div>
      </div>)
    } else {
      if (sessionStorage.getItem('login_session') == 0) {
        return (
          <div className="animated fadeIn">
            <Row>
              <Col xl={12}>
                <Card>
                  <CardHeader>
                    <row>
                      <Col col="2" ><strong>Users Role</strong></Col>
                      <Col col="2" className="text-right">
                        <Button outline color="primary" onClick={this.togglePrimary} className="mr-1">Create</Button>
                      </Col>
                    </row>
                  </CardHeader>
                  <CardBody>
                    <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                      className={'modal-primary ' + this.props.className}>
                      <ModalHeader toggle={this.togglePrimary}>Buat Hak Akses</ModalHeader>
                      <ModalBody>
                        <form onSubmit={this.handleSubmitCreate}>
                          <div class="form-group">
                            <label>ID Kecamatan</label>
                            <select class="form-control" onChange={this.handleChangeOption_kecamatan}>
                              <option disabled selected>ID Kecamatan</option>
                              {this.state.table_kecamatan.map((table, index) => {
                                return (
                                  <option value={table.id_kecamatan}>{table.id_kecamatan} - {table.nama}</option>
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

                    <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                      className={'modal-Large ' + this.props.className}>
                      <ModalHeader toggle={this.toggleLarge}>Edit User</ModalHeader>
                      <ModalBody>
                        <form className="form-group" onSubmit={this.handleSubmitEdit}>
                          <div class="form-group">
                            <label>ID Kecamatan</label>
                            <select class="form-control" onChange={this.handleChangeOption_active_kecamatan}>
                              {this.state.table_kecamatan.map((table, index) => {
                                return (
                                  <option value={table.id_kecamatan} selected={table.id_kecamatan == this.state.activeid_kecamatan}>{table.id_kecamatan} - {table.nama}</option>
                                )
                              })}
                            </select>
                          </div>
                          <div class="form-group">
                            <label>ID User</label>
                            <select class="form-control" onChange={this.handleChangeOption_active_user}>
                              <option disabled selected>Pilih ID User</option>
                              {this.state.table_constraint_user.map((table_user, index) => {
                                return (
                                  <option value={table_user.id_user} selected={table_user.id_user == this.state.activeid_user}>{table_user.id_user} - {table_user.username}</option>
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
                    <ReactTable
                      data={this.state.table_constraint_user}
                      defaultPageSize={10}
                      filterable
                      columns={[
                        { accessor: 'id_user', show: false },
                        { accessor: 'id_kecamatan', show: false },
                        {
                          Header: 'ID Role',
                          accessor: 'id_role', // String-based value accessors!
                          show: false,
                          Cell: row => (
                            <div>
                              {row.row.id_role}
                            </div>
                          )
                        },
                        {
                          Header: 'User',
                          accessor: 'username', // String-based value accessors!
                          Cell: row => (
                            <div>
                              {row.row.username}
                            </div>
                          )
                        },
                        {
                          Header: 'Kecamatan',
                          accessor: 'nama', // String-based value accessors!
                          Cell: row => (
                            <div>
                              {row.row.nama}
                            </div>
                          )
                        },
                        {
                          Header: 'Role',
                          accessor: 'role', // String-based value accessors!
                          show: false
                        },
                        {
                          Header: 'Actions',
                          filterable: false,
                          Cell: row => (
                            <div>
                              <Button outline color="success" onClick={() => this.toggleLarge(row.row)} className="mr-1"><i className="cui-pencil icons text-left"></i></Button>
                              <Button outline color="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handledelete(row.row) }} className="mr-1"><i className="cui-circle-x icons text-left"></i></Button>
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
      } else if (sessionStorage.getItem('login_session') == "1") {
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

export default ManajemenHakAksesKec;
