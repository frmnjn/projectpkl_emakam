import React, { Component } from 'react';

import {
  Container,
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
import { RingLoader } from 'react-spinners';
const center = {
  marginLeft: '45%'
};
class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      newpassword: "",
      isLoaded: false
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangePassword = event => {
    console.log(this.state.oldpassword);
    console.log(this.state.newpassword);
    event.preventDefault();
    fetch('http://178.128.81.243:8000/api/change_password?token='+sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldpassword: this.state.oldpassword,
        newpassword: this.state.newpassword
      })
    }).then(
      this.setState({
        isLoaded: true
      })
    ).then((response) => response.json())
    .then((responseJson) => {
      alert(responseJson.msg);
      if(responseJson.success){
        if (responseJson.role == 0) {
          this.props.history.push('/ManajemenTPU')
        } else if (responseJson.role == 1) {
          this.props.history.push('/ManajemenBlokMakam')
        } else {
          this.props.history.push('/Search')
        }
      }

    });
  }

  load() {
    return (
      <div style={center} className='sweet-loading'>
        <RingLoader
          color={'#123abc'}
        />
      </div>
    );
  }

  nothing() {
    return (<div></div>)
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h2>Change Password</h2>
                  <p className="text-muted"></p>
                  <form className="form-group" onSubmit={this.handleChangePassword}>
                    <label>Old Password</label>
                    <input type="password" className="form-control" name="oldpassword" onChange={this.handleChange}></input>
                    <label>New Password</label>
                    <input type="password" className="form-control" name="newpassword" onChange={this.handleChange}></input>
                    <br /><input type="submit" className="form-control btn btn-success" Value="Submit"></input>
                  </form>
                  {this.state.isLoaded ? this.load() : this.nothing()}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ChangePassword;
