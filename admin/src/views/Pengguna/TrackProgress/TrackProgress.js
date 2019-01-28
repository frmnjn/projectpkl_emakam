import React, { Component } from 'react';

import {
  Container,
  Card,
  CardBody,
  Col,
  Row
} from 'reactstrap';
import { RingLoader } from 'react-spinners';
const center = {
  marginLeft: '45%'
};
class TrackProgress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasil:[],
      status: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangePassword = event => {
    event.preventDefault();
    fetch('http://localhost:8000/api/track_progress?kode_registrasi='+this.state.koderegistrasi)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        hasil:responseJson
      });
    });
  }

  load() {
    return (<div>
      {this.state.hasil.map((hasil, index) => (
          <p>Nama Almarhum : {hasil.nama_almarhum} <br></br>Status : {hasil.status}</p>
      ))}
      </div>)
  }

  render() {
    console.log(this.state.hasil.nama_almarhum);
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h2>Track Progress</h2>
                  <p className="text-muted"></p>
                  <form className="form-group" onSubmit={this.handleChangePassword}>
                    <input type="text" className="form-control" name="koderegistrasi" onChange={this.handleChange} placeholder="Input Kode Registrasi"></input>
                    <br /><input type="submit" className="form-control btn btn-success" Value="Submit"></input>
                  </form>
                  {this.load()}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TrackProgress;
