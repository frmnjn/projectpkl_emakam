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

  onchangeText = (e) => {
    data.append(e.target.name, e.target.value);
  }

  handleSubmit = event =>  {
    event.preventDefault();
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
          <Col xs="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col col="10" ><strong>Registrasi Perijinan Makam</strong></Col>
                  <Col col="2" className="text-right">
                    {/* <Button onClick={this.toggleCreate} outline color="primary">Create</Button> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {/* <hr></hr> */}
                <Col xs="4">
                <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label>
                    Nama Almarhum:
                  </label>
                  <input type="text" onChange={this.onchangeText} class="form-control" name="nama_almarhum" placeholder="Nama Almarhum"/>
                  <br />
                  <label>
                    Nama Pewaris:
                  </label>
                  <input type="text" onChange={this.onchangeText} class="form-control" name="nama_pewaris" placeholder="Nama Pewaris"/>
                  <br />
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
                  <input type="submit" value="Submit"></input>
                </div>
                </form>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>

          </Col>
        </Row>
      </div>
    );
  }
}

export default RegistrasiPerijinanMakam;
