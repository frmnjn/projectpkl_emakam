import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button,
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

import usersData from './UsersData'

class User extends Component {
  constructor(props){
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleFormName = this.handleFormName.bind(this);
    this.handleFormPassword = this.handleFormPassword.bind(this);
    this.handleFormUname = this.handleFormUname.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);

    this.state={
      editname:null,
      edituname:null,
      editpassword:null,
    }

  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }


  handleFormName= event =>{
    this.setState({
      editname:event.target.value
    })
  }

  handleFormUname= event =>{
    this.setState({
      edituname:event.target.value
    })
  }

  handleFormPassword= event =>{
    this.setState({
      editpassword:event.target.value
    })
  }

  handlesubmit(){
    
    fetch('http://api.emakam.tujuhlangit.id/edit_user/'+usersData.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: this.state.editname,
        usrname: this.state.edituname,
        passwrd: this.state.editpassword,
      })
    }).then(
      usersData.name= this.state.editname,
      usersData.username= this.state.edituname,
      usersData.password= this.state.editpassword
    ).then(
      this.toggle
    )
  }
  
  render() {

    // const user = usersData.find( user => user.id.toString() === '0')

    const userDetails = Object.entries(usersData) 

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {usersData.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        userDetails.map(([key, value]) => {
                          return (
                            <tr>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                  <Button onClick={this.toggle}  block outline color="success">edit</Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}
                              className={'modal' + this.props.className}>
                          <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                          <ModalBody>
                                <Row>
                                  <Col xs="12">
                                    <div className="small text-muted">
                                      <span>Account ID :</span> {usersData.id}
                                    </div>
                                  </Col>
                                </Row>
                                <br/>
                                <Row>
                                  <Col xs="12">
                                    <FormGroup>
                                      <Label htmlFor="ccnumber">Name</Label>
                                      <Input onChange={this.handleFormName} type="text" id="ccnumber" placeholder={usersData.name} required />
                                      <Label htmlFor="ccnumber">Username</Label>
                                      <Input onChange={this.handleFormUname} type="text" id="ccnumber" placeholder={usersData.username} required />
                                      <Label htmlFor="ccnumber">Password</Label>
                                      <Input onChange={this.handleFormPassword} type="text" id="ccnumber" placeholder={usersData.password} required />
                                    </FormGroup>
                                  </Col>
                                </Row>
                          </ModalBody>
                          <ModalFooter>
                            <Button onClick={this.handlesubmit} color="success">edit</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                          </ModalFooter>
                        </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
