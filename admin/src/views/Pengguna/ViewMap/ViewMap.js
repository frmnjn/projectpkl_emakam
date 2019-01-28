import React, { Component } from 'react';

import {
  Container,
  Card,
  CardBody,
  Col,
  Row
} from 'reactstrap';
import { RingLoader } from 'react-spinners';
import {Map, InfoWindow, Marker, GoogleApiWrapper,Polygon} from 'google-maps-react';
const center = {
  marginLeft: '45%'
};
class ViewMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasil:[],
      status: "",
      items:[]
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  load() {
    //alert('is it working ?')
    return (

      this.state.items.map((hasil, index) => (
      
          <Marker position={{ lat: hasil.lat, lng: hasil.lng}}onClick={this.onMarkerClick}
          name={'Current location'} >
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>Center Map</h1>
            </div>
          </InfoWindow>
          </Marker>
        
      ))

      )
  }

  componentDidMount(){
    fetch("http://localhost:8000/api/view_all_makam?token=" + sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            items: json
          });
        },
    )

    
  }

  render() {
    console.log(this.state.items)
    console.log(this.state.hasil.nama_almarhum);
    return (
      <div>
        <Container>
          <br/>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h2>View Map</h2>
                  <Row>
                    <Col style={{height:'80vh'}}>
                    <Map 
                      google={this.props.google}
                      initialCenter={{lat:-7.967345,lng:112.632462}}
                      zoom={13}     
                      style={{width:'95%'}}                                  
                    >
                      
                      {/* <Marker position={{ lat: -7.967345, lng: 112.632462}}onClick={this.onMarkerClick}
                          name={'Current location'} />
                      <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                          <h1>Center Map</h1>
                        </div>
                      </InfoWindow>

                      <Marker position={{ lat: -7.9596713, lng: 112.6281196}}onClick={this.onMarkerClick}
                          name={'Current location'} />
                      <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                          <h1>TPU Samaan</h1>
                        </div>
                      </InfoWindow>

                      <Marker position={{ lat: -7.988771, lng: 112.6216143}}onClick={this.onMarkerClick}
                          name={'Current location'} />
                      <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                          <h1>TPU Kasin</h1>
                        </div>
                      </InfoWindow> */}

                      {this.load()}

                    </Map>
                    </Col>
                  </Row>
                  {/* <p className="text-muted"></p>
                  <form className="form-group" onSubmit={this.handleChangePassword}>
                    <input type="text" className="form-control" name="koderegistrasi" onChange={this.handleChange} placeholder="Input Kode Registrasi"></input>
                    <br /><input type="submit" className="form-control btn btn-success" Value="Submit"></input>
                  </form>
                  {this.load()} */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDTUAyUGbuCXiRX6ywsz4ZIAf_jDPPRwUM')
})(ViewMap);
