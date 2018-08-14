import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
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
import { RingLoader } from 'react-spinners';
const data = new FormData();
class RegistrasiPerijinanMakam extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  onchange(e) {
    data.append(e.target.name, e.target.files[0]);
  }

  handleSubmit() {
    for (var value of data.values()) {
      console.log(value);
    }

    fetch('http://localhost:8000/api/upload?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      body: data
    }).then((response) => response.json())
    .then((responseJson) => {
      alert(responseJson);
    })

  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <div class="form-group">
              <label for="ktp_pewaris">
                KTP Pewaris:
                <input type="file" onChange={this.onchange} class="form-control-file" name="ktp_pewaris" />
              </label>
              <br />
              <label for="surat_kematian">
                Surat Kematian:
                <input type="file" onChange={this.onchange} class="form-control-file" name="surat_kematian" />
              </label>
              <br />
              <button type="submit" onClick={() => this.handleSubmit()}>Submit</button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RegistrasiPerijinanMakam;
